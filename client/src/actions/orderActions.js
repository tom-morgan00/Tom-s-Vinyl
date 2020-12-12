import {
  CLEAR_CART,
  SHIPPING_ADDRESS,
  SUBMIT_ORDER,
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_LOADING,
} from './constants';
import { api } from '../api';

import Cookie from 'js-cookie';

export const setShippingAddress = (address, city, postCode, country) => (
  dispatch
) => {
  const shippingAddress = {
    address,
    city,
    postCode,
    country,
  };
  dispatch({
    type: SHIPPING_ADDRESS,
    payload: {
      shippingAddress,
    },
  });
  Cookie.set('shippingAddress', JSON.stringify(shippingAddress));
};

export const submitOrder = (deliveryAddress, auth, items, totals) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: SUBMIT_ORDER_LOADING,
    payload: {
      loading: true,

      error: false,
    },
  });
  try {
    const { _id, name, email } = auth;
    const { data } = await api.post('/order', {
      auth: {
        _id,
        name,
        email,
      },
      deliveryAddress,
      order: {
        items,
      },
      totals,
    });

    if (data.status === 'success') {
      dispatch({
        type: SUBMIT_ORDER,
        payload: {
          orderInfo: data,
          loading: false,
          error: false,
        },
      });
      dispatch({
        type: CLEAR_CART,
        payload: {
          items: [],
        },
      });
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
    } else {
      dispatch({
        type: SUBMIT_ORDER_ERROR,
        payload: {
          loading: false,
          error: data,
        },
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: SUBMIT_ORDER_ERROR,
      payload: {
        loading: false,
        error: err,
      },
    });
  }
};
