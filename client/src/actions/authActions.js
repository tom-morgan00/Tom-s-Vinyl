import { api } from '../api';
// prettier-ignore
import { SIGN_IN, SIGN_IN_LOADING, SIGN_IN_ERROR, SIGN_UP, SIGN_UP_LOADING, SIGN_UP_ERROR, SIGN_UP_PASSWORD_ERROR, SIGN_OUT, RESET_ERROR } from './constants';

import Cookie from 'js-cookie';

export const resetError = () => {
  return {
    type: RESET_ERROR,
    payload: {
      error: false,
    },
  };
};

export const signIn = (email, password) => async (dispatch, getState) => {
  dispatch({
    type: SIGN_IN_LOADING,
    payload: {
      loading: true,
      error: false,
    },
  });
  try {
    const { data } = await api.post('/users/signin', { email, password });

    if (data.status === 'success') {
      dispatch({
        type: SIGN_IN,
        payload: {
          userInfo: data.data,
          loading: false,
          error: false,
        },
      });
      Cookie.set('userInfo', JSON.stringify(getState().auth.userInfo));
    } else {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: {
          loading: false,
          error: data,
        },
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: SIGN_IN_ERROR,
      payload: {
        loading: false,
        error: err,
      },
    });
  }
};

export const signUp = (name, email, password, password2) => async (
  dispatch,
  getState
) => {
  if (password !== password2) {
    const error = {
      status: 'failed',
      message: 'Both passwords must be the same',
    };
    return dispatch({
      type: SIGN_UP_PASSWORD_ERROR,
      payload: {
        error,
      },
    });
  }
  dispatch({
    type: SIGN_UP_LOADING,
    payload: {
      loading: true,
      error: false,
    },
  });
  try {
    const { data } = await api.post('/users/signup', {
      name,
      email,
      password,
    });
    if (data.status === 'success') {
      dispatch({
        type: SIGN_UP,
        payload: {
          loading: false,
          error: false,
          userInfo: data.data,
        },
      });
      Cookie.set('userInfo', JSON.stringify(getState().auth.userInfo));
    } else {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: {
          loading: false,
          error: data,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: SIGN_UP_ERROR,
      payload: {
        loading: false,
        error: err,
      },
    });
  }
};

export const signOut = () => (dispatch) => {
  Cookie.remove('userInfo');
  Cookie.remove('shippingAddress');
  dispatch({
    type: SIGN_OUT,
  });
};
