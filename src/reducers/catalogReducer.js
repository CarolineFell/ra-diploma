import {
  FETCH_CATALOG_CATEGORIES_REQUEST,
  FETCH_CATALOG_CATEGORIES_CHANGE,
  FETCH_CATALOG_CATEGORIES_SUCCESS,
  FETCH_CATALOG_ITEMS_REQUEST,
  FETCH_CATALOG_ITEMS_SUCCESS,
  FETCH_CATALOG_FAILURE,
  SEARCH_CHANGE,
  SEARCH_CLEAR,
} from '../types/catalogTypes';

const initialState = {
  categories: [{ id: 0, title: 'Все' }],
  activeCategory: 0,
  items: [],
  responseItemsAmount: 0,
  search: '',
  loading: false,
  loadingCategory: false,
  error: null,
};

export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATALOG_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: [{ id: 0, title: 'Все' }],
        activeCategory: 0,
        items: [],
        responseItemsAmount: 0,
        loading: true,
        loadingCategory: true,
        error: null,
      };
    case FETCH_CATALOG_CATEGORIES_CHANGE: {
      const { categoryId } = action.payload;
      return {
        ...state,
        items: [],
        activeCategory: categoryId,
      };
    }
    case FETCH_CATALOG_CATEGORIES_SUCCESS: {
      const { dataCategory } = action.payload;
      return {
        ...state,
        categories: [...state.categories, ...dataCategory],
      };
    }
    case FETCH_CATALOG_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        responseItemsAmount: 0,
      };
    case FETCH_CATALOG_ITEMS_SUCCESS: {
      const { dataItems } = action.payload;
      return {
        ...state,
        items: [...state.items, ...dataItems],
        responseItemsAmount: dataItems.length,
        loading: false,
        loadingCategory: false,
        error: null,
      };
    }
    case SEARCH_CHANGE: {
      const { value } = action.payload;
      return {
        ...state,
        items: [],
        search: value,
      };
    }
    case SEARCH_CLEAR:
      return { 
        ...state, 
        search: '' 
      };
    case FETCH_CATALOG_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        loadingCategory: false,
        error,
      };
    }
    default:
      return { ...state };
  }
}