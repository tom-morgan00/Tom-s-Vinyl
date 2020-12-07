import {
  ERROR_PRODUCT,
  GET_PRODUCT,
  LOADING_PRODUCT,
  REMOVE_PRODUCT,
} from '../actions/constants';

const INITIAL_STATE = {
  product: null,
  loading: false,
  error: false,
};

export default function productsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCT: {
      const { loading, error, product } = action.payload;
      return {
        ...state,
        loading,
        product,
        error,
      };
    }
    case REMOVE_PRODUCT: {
      const { loading, error, product } = action.payload;
      return {
        ...state,
        product,
        loading,
        error,
      };
    }

    case LOADING_PRODUCT: {
      const { loading, error, product } = action.payload;
      return {
        ...state,
        loading,
        product,
        error,
      };
    }

    case ERROR_PRODUCT: {
      const { loading, error, product } = action.payload;
      return {
        ...state,
        loading,
        product,
        error,
      };
    }
    default:
      return state;
  }
}
