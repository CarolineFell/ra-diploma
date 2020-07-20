import {
  BASKET_INIT_PRODUCT,
  BASKET_CHANGE_PRODUCT,
} from '../types/basketProductTypes';

const initialState = {
  products: [],
};

export default function basketProductReducer(state = initialState, action) {
  switch (action.type) {
    case BASKET_INIT_PRODUCT: {
      const { productsBasket } = action.payload;
      return {
        products: productsBasket,
      };
    }
    case BASKET_CHANGE_PRODUCT: {
      const { itemProduct } = action.payload;
      return {
        products: itemProduct,
      };
    }
    default:
      return { ...state };
  }
}