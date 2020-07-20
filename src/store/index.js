import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { topSalesEpics } from '../epics/topSalesEpics';
import { fetchCatalogCategoriesEpics, fetchCatalogItemsEpics, fetchCatalogCategoriesChangeEpics, searchChangeEpics} from '../epics/catalogEpics';
import { productEpics } from '../epics/productEpics';
import { orderEpics } from '../epics/orderEpics';
import topSalesReducer from '../reducers/topSalesReducer';
import catalogReducer from '../reducers/catalogReducer';
import productReducer from '../reducers/productReducer';
import basketProductReducer from '../reducers/basketProductReducer';
import orderReducer from '../reducers/orderReducer';

const reducer = combineReducers({
  topSalesList: topSalesReducer,
  catalogList: catalogReducer,
  productItem: productReducer,
  basket: basketProductReducer,
  order: orderReducer,
});

const epic = combineEpics(
  topSalesEpics,
  fetchCatalogCategoriesEpics,
  fetchCatalogItemsEpics,
  fetchCatalogCategoriesChangeEpics,
  searchChangeEpics,
  productEpics,
  orderEpics,
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epic);

export default store;
