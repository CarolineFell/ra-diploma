import {
  BASKET_INIT_PRODUCT,
  BASKET_CHANGE_PRODUCT,
} from '../types/basketProductTypes';

export function basketInitProduct(productsBasket) {
  return { type: BASKET_INIT_PRODUCT, payload: { productsBasket } };
}

export function basketChangeProduct(itemProduct) {
  return { type: BASKET_CHANGE_PRODUCT, payload: { itemProduct } };
}