import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';

const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
});

export default reducers;
