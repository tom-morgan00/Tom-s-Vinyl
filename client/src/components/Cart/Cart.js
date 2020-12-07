import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from './CartTotals';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(val) => {
            const { cart } = val;
            return cart.length > 0 ? (
              <>
                <Title title="Your Cart" />
                <CartColumns />
                <CartList value={val} />
                <CartTotals value={val} history={this.props.history} />
              </>
            ) : (
              <EmptyCart />
            );
          }}
        </ProductConsumer>
      </section>
    );
  }
}
