import {
  SHIPPING_ADDRESS,
  SUBMIT_ORDER,
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_LOADING,
} from '../actions/constants';
import Cookie from 'js-cookie';

const shippingAddress = Cookie.getJSON('shippingAddress') || null;

const INITIAL_STATE = {
  shippingAddress,
  orderInfo: null,
};

export default function orderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHIPPING_ADDRESS: {
      const { shippingAddress } = action.payload;
      return {
        ...state,
        shippingAddress,
      };
    }

    case SUBMIT_ORDER_LOADING: {
      const { loading, error } = action.payload;
      return {
        ...state,
        loading,
        error,
      };
    }

    case SUBMIT_ORDER: {
      const { orderInfo, loading, error } = action.payload;
      return {
        ...state,
        orderInfo,
        loading,
        error,
      };
    }

    case SUBMIT_ORDER_ERROR: {
      const { loading, error } = action.payload;
      return {
        ...state,
        loading,
        error,
      };
    }

    default:
      return state;
  }
}
