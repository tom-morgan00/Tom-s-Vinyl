import { api } from '../api';
// prettier-ignore
import { ADD_TO_CART, CLEAR_CART, DECREMENT_ITEM, INCREMENT_ITEM, REMOVE_ITEM } from './constants';

export const cartAddItem = (id) => async (dispatch, getState) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    // prettier-ignore
    const { _id, artist, title, image, price } = data.data.product
    const item = {
      _id,
      artist,
      title,
      image,
      price,
      quantity: 1,
    };
    dispatch({
      type: ADD_TO_CART,
      payload: {
        item,
      },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
  } catch (err) {
    console.log(err);
  }
};

export const increment = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: INCREMENT_ITEM,
    payload: {
      _id: id,
      quantity: qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
};

export const decrement = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: DECREMENT_ITEM,
    payload: {
      _id: id,
      quantity: qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
};

export const cartRemoveItem = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM,
    payload: {
      _id: id,
      inCart: false,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: CLEAR_CART,
    payload: {
      items: [],
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
};
