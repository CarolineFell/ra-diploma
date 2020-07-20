import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { FETCH_PRODUCT_REQUEST } from '../types/productTypes';
import { fetchProductSuccess, fetchProductFailure } from '../actions/productActions';

export const productEpics = (action$) => action$.pipe(
  ofType(FETCH_PRODUCT_REQUEST),
  map((o) => o.payload.id),
  switchMap((id) => ajax.getJSON(`${process.env.REACT_APP_URL}items/${id}`).pipe(
    map((item) => fetchProductSuccess(item)),
    catchError((e) => of(fetchProductFailure(e))),
  )),
);
