import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { FETCH_TOP_SALES_REQUEST } from '../types/topSalesTypes';
import { fetchTopSalesSuccess, fetchTopSalesFailure } from '../actions/topSalesActions';

export const topSalesEpics = (action$) => action$.pipe(
  ofType(FETCH_TOP_SALES_REQUEST),
  switchMap(() => ajax.getJSON(`${process.env.REACT_APP_URL}top-sales`).pipe(
    map((items) => fetchTopSalesSuccess(items)),
    catchError((e) => of(fetchTopSalesFailure(e))),
  )),
);
