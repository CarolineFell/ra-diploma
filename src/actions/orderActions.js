import {
  ORDER_INIT,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from '../types/orderTypes';

export function orderInit() {
  return { type: ORDER_INIT };
}

export function orderRequest(itemOrder) {
  return { type: ORDER_REQUEST, payload: { itemOrder } };
}

export function orderSuccess(success) {
  return { type: ORDER_SUCCESS, payload: { success } };
}

export function orderFailure(error) {
  return { type: ORDER_FAILURE, payload: { error } };
}