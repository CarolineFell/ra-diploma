import {
  ORDER_INIT,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from '../types/orderTypes';

const initialState = {
  response: null,
  loading: false,
  error: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_INIT:
      return { 
        ...initialState 
      };
    case ORDER_REQUEST:
      return {
        ...state,
        response: null,
        loading: true,
        error: null,
      };
    case ORDER_SUCCESS: {
      const { success } = action.payload;
      return {
        ...state,
        response: success,
        loading: false,
        error: null,
      };
    }
    case ORDER_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        response: null,
        loading: false,
        error,
      };
    }
    default:
      return { ...state };
  }
}