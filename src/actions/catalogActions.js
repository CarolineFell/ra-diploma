import {
  FETCH_CATALOG_CATEGORIES_REQUEST,
  FETCH_CATALOG_CATEGORIES_CHANGE,
  FETCH_CATALOG_CATEGORIES_SUCCESS,
  FETCH_CATALOG_ITEMS_REQUEST,
  FETCH_CATALOG_ITEMS_SUCCESS,
  FETCH_CATALOG_FAILURE,
  SEARCH_CHANGE,
  SEARCH_CLEAR,
} from '../types/catalogTypes';

export function fetchCatalogCategories() {
  return { type: FETCH_CATALOG_CATEGORIES_REQUEST };
}

export function fetchCatalogCategoriesSuccess(dataCategory) {
  return { type: FETCH_CATALOG_CATEGORIES_SUCCESS, payload: { dataCategory } };
}

export function fetchCatalogCategoriesChange(categoryId) {
  return { type: FETCH_CATALOG_CATEGORIES_CHANGE, payload: { categoryId } };
}

export function fetchCatalogItemsRequest() {
  return { type: FETCH_CATALOG_ITEMS_REQUEST };
}

export function fetchCatalogItemsSucces(dataItems) {
  return { type: FETCH_CATALOG_ITEMS_SUCCESS, payload: { dataItems } };
}

export function fetchCatalogFailure(error) {
  return { type: FETCH_CATALOG_FAILURE, payload: { error } };
}

export function searchChange(value) {
  return { type: SEARCH_CHANGE, payload: { value } };
}

export function searchClear() {
  return { type: SEARCH_CLEAR };
}