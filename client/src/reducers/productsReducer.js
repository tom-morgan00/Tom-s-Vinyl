import {
  ERROR_PRODUCTS,
  GET_PRODUCTS,
  LOADING_PRODUCTS,
} from '../actions/constants';

const INITIAL_STATE = {
  products: null,
  loading: false,
  error: false,
};

export default function productsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      const { loading, error, products } = action.payload;

      return {
        ...state,
        loading,
        products,
        error,
      };

    case LOADING_PRODUCTS: {
      const { loading, error, products } = action.payload;
      return {
        ...state,
        loading,
        products,
        error,
      };
    }

    case ERROR_PRODUCTS: {
      const { loading, error, products } = action.payload;
      return {
        ...state,
        loading,
        products,
        error,
      };
    }
    default:
      return state;
  }
}
