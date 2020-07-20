import {
  FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_SUCCESS,
  FETCH_TOP_SALES_FAILURE,
  FETCH_TOP_SALES_CLEAR,
} from '../types/topSalesTypes';

export function fetchTopSalesClear() {
  return { type: FETCH_TOP_SALES_CLEAR };
}

export function fetchTopSalesRequest() {
  return { type: FETCH_TOP_SALES_REQUEST };
}

export function fetchTopSalesSuccess(data) {
  return { type: FETCH_TOP_SALES_SUCCESS, payload: { data } }
}

export function fetchTopSalesFailure(error) {
  return { type: FETCH_TOP_SALES_FAILURE, payload: { error } };
}