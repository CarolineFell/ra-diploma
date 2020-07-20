import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ORDER_REQUEST } from '../types/orderTypes';
import { orderSuccess, orderFailure } from '../actions/orderActions';

export const orderEpics = (action$) => action$.pipe(
  ofType(ORDER_REQUEST),
  map((o) => o.payload.itemOrder),
  switchMap((objSend) => ajax({
    url: `${process.env.REACT_APP_URL}order`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objSend),
  }).pipe(
    map((item) => orderSuccess(item.status)),
    catchError((e) => of(orderFailure(e))),
  )),
);
