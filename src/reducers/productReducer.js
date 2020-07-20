import {
  FETCH_PRODUCT_CLEAR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from '../types/productTypes';

const initialState = {
  item: {},
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_CLEAR:
      return { ...initialState };
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_SUCCESS: {
      const { item } = action.payload;
      return {
        ...state,
        item,
        loading: false,
        error: null,
      };
    }
    case FETCH_PRODUCT_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }
    default:
      return { ...state };
  }
}
