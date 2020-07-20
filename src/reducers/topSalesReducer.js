import {
  FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_SUCCESS,
  FETCH_TOP_SALES_FAILURE,
  FETCH_TOP_SALES_CLEAR,
} from '../types/topSalesTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_SALES_CLEAR:
      return { ...initialState };
    case FETCH_TOP_SALES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TOP_SALES_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        items: data,
        loading: false,
        error: null,
      };
    }
    case FETCH_TOP_SALES_FAILURE: {
      const { error } = action.payload;
      return {
        items: [],
        loading: false,
        error,
      };
    }
    default:
      return { ...state };
  }
}