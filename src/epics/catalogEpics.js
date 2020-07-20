import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  switchMap,
  catchError,
  mergeMap,
} from 'rxjs/operators';
import queryString from 'query-string';
import {
  FETCH_CATALOG_CATEGORIES_REQUEST,
  FETCH_CATALOG_ITEMS_REQUEST,
  FETCH_CATALOG_CATEGORIES_CHANGE,
  SEARCH_CHANGE,
} from '../types/catalogTypes';
import {
  fetchCatalogCategoriesSuccess,
  fetchCatalogItemsSucces,
  fetchCatalogFailure,
  fetchCatalogItemsRequest,
} from '../actions/catalogActions';
import store from '../store';

export const fetchCatalogCategoriesEpics = (action$) => action$.pipe(
  ofType(FETCH_CATALOG_CATEGORIES_REQUEST),
  map(() => store.getState().catalogList),
  switchMap(() => ajax.getJSON(`${process.env.REACT_APP_URL}categories`).pipe(
    mergeMap((dataCategory) => [fetchCatalogCategoriesSuccess(dataCategory), fetchCatalogItemsRequest()]),
    catchError((error) => of(fetchCatalogFailure(error))),
  )),
);

export const fetchCatalogItemsEpics = (action$) => action$.pipe(
  ofType(FETCH_CATALOG_ITEMS_REQUEST),
  map(() => {
    const {
      activCategory,
      items,
      search
    } = store.getState().catalogList;

    const queryUrl = queryString.stringify({q: search, categoryId: activCategory, offset: items.length}, {
      skipEmptyString: true
    });

    return `?${queryUrl}`;
  }),
  switchMap((query) => ajax.getJSON(`${process.env.REACT_APP_URL}items${query}`).pipe(
    map((dataItems) => fetchCatalogItemsSucces(dataItems)),
    catchError((error) => of(fetchCatalogFailure(error))),
  )),
);

export const fetchCatalogCategoriesChangeEpics = (action$) => action$.pipe(
  ofType(FETCH_CATALOG_CATEGORIES_CHANGE),
  map(() => fetchCatalogItemsRequest()),
);

export const searchChangeEpics = (action$) => action$.pipe(
  ofType(SEARCH_CHANGE),
  map(() => fetchCatalogItemsRequest()),
);
