import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import productReducer from './productReducer';

const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
});

export default reducers;
