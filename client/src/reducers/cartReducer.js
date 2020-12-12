import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  REMOVE_ITEM,
} from '../actions/constants';

const items =
  (localStorage.cartItems && JSON.parse(localStorage.getItem('cartItems'))) ||
  [];

const INITIAL_STATE = {
  items: [...items],
};

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { item } = action.payload;
      return {
        ...state,
        items: [...state.items, item],
      };
    }

    case REMOVE_ITEM: {
      const { _id } = action.payload;
      return {
        ...state,
        items: [...state.items.filter((item) => item._id !== _id)],
      };
    }

    case INCREMENT_ITEM: {
      const { _id, quantity } = action.payload;
      const tempItems = [...state.items];
      const tempItem = tempItems.find((item) => item._id === _id);
      tempItem.quantity = quantity;
      return {
        ...state,
        items: [...tempItems],
      };
    }

    case DECREMENT_ITEM: {
      const { _id, quantity } = action.payload;
      const tempItems = [...state.items];
      const tempItem = tempItems.find((item) => item._id === _id);
      tempItem.quantity = quantity;
      return {
        ...state,
        items: [...tempItems],
      };
    }

    case CLEAR_CART: {
      const { items } = action.payload;
      return {
        ...state,
        items,
      };
    }

    default:
      return state;
  }
}
