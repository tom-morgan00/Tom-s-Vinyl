import React from 'react';
import CartItemList from './CartItemList';

export default function CartTable({
  items,
  cartRemoveItem,
  increment,
  decrement,
}) {
  return (
    <section width="100%">
      <CartItemList
        items={items}
        cartRemoveItem={cartRemoveItem}
        increment={increment}
        decrement={decrement}
      />
    </section>
  );
}
