// prettier-ignore
import { SIGN_IN, SIGN_IN_LOADING, SIGN_IN_ERROR, SIGN_UP, SIGN_UP_LOADING, SIGN_UP_ERROR, SIGN_OUT, SIGN_UP_PASSWORD_ERROR, RESET_ERROR } from '../actions/constants';
import Cookie from 'js-cookie';

const userInfo = Cookie.getJSON('userInfo') || null;

const INITIAL_STATE = {
  userInfo,
  loading: false,
  error: false,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    case SIGN_IN_LOADING: {
      const { loading, userInfo, error } = action.payload;
      return {
        loading,
        userInfo,
        error,
      };
    }

    case SIGN_IN: {
      const { loading, userInfo, error } = action.payload;
      return {
        loading,
        userInfo,
        error,
      };
    }

    case SIGN_IN_ERROR: {
      const { loading, userInfo, error } = action.payload;
      return {
        userInfo,
        loading,
        error,
      };
    }
    case SIGN_UP_PASSWORD_ERROR: {
      const { error } = action.payload;
      return {
        error: error,
      };
    }
    case SIGN_UP_LOADING: {
      const { loading, userInfo, error } = action.payload;
      return {
        loading,
        userInfo,
        error,
      };
    }

    case SIGN_UP: {
      const { loading, userInfo, error } = action.payload;
      return {
        loading,
        userInfo,
        error,
      };
    }

    case SIGN_UP_ERROR: {
      const { loading, userInfo, error } = action.payload;
      return {
        userInfo,
        loading,
        error,
      };
    }
    case SIGN_OUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
}
