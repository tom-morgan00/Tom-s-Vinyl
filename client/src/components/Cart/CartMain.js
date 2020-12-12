import React from 'react';
import CartTable from './CartTable';
import CartTotals from './CartTotals';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  cartMain: {
    padding: '5rem 0',
  },
});

export default function CartMain({
  items,
  clearCart,
  cartRemoveItem,
  increment,
  decrement,
}) {
  const classes = useStyles();
  return (
    <section className={classes.cartMain}>
      <CartTable
        items={items}
        cartRemoveItem={cartRemoveItem}
        increment={increment}
        decrement={decrement}
      />
      <CartTotals items={items} clearCart={clearCart} />
    </section>
  );
}
