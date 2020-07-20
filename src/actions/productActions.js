import {
  FETCH_PRODUCT_CLEAR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from '../types/productTypes';

export function fetchProductClear() {
  return { type: FETCH_PRODUCT_CLEAR };
}

export function fetchProductRequest(id) {
  return { type: FETCH_PRODUCT_REQUEST, payload: { id } };
}

export function fetchProductSuccess(item) {
  return { type: FETCH_PRODUCT_SUCCESS, payload: { item } };
}

export function fetchProductFailure(error) {
  return { type: FETCH_PRODUCT_FAILURE, payload: { error } };
}