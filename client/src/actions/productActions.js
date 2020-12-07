import { api } from '../api';
import {
  ERROR_PRODUCT,
  ERROR_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCTS,
  LOADING_PRODUCT,
  LOADING_PRODUCTS,
  REMOVE_PRODUCT,
} from './constants';

//GET ALL PRODUCTS
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_PRODUCTS,
      payload: {
        error: false,
        loading: true,
        products: [],
      },
    });
    const { data } = await api.get('/');
    dispatch({
      type: GET_PRODUCTS,
      payload: {
        loading: false,
        error: false,
        products: data.data.products,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ERROR_PRODUCTS,
      payload: {
        error: err,
        loading: false,
        products: [],
      },
    });
  }
};

export const getProductByID = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_PRODUCT,
      payload: {
        loading: true,
        error: false,
        product: {},
      },
    });
    const { data } = await api.get(`/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: {
        loading: false,
        error: false,
        product: data.data.product,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ERROR_PRODUCT,
      payload: {
        loading: false,
        error: err,
        product: {},
      },
    });
  }
};

export const removeProduct = () => {
  return {
    type: REMOVE_PRODUCT,
    payload: {
      product: null,
      loading: false,
      error: false,
    },
  };
};
