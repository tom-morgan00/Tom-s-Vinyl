import React, { Component } from 'react';
import { connect } from 'react-redux';
// prettier-ignore
import { cartRemoveItem, clearCart, increment, decrement } from '../actions/cartActions';
import Title from '../components/Reusable/Title';
import { Container } from '@material-ui/core';
import CartMain from '../components/Cart/CartMain';

class Cart extends Component {
  render() {
    // prettier-ignore
    const { items, increment, decrement, cartRemoveItem, clearCart } = this.props;

    return (
      <main id="cart">
        <Container maxWidth="lg">
          <Title title="Cart" />
          <section>
            {items.length > 0 ? (
              <CartMain
                clearCart={clearCart}
                items={items}
                cartRemoveItem={cartRemoveItem}
                increment={increment}
                decrement={decrement}
              />
            ) : (
              <h1>No Items in Cart</h1>
            )}
          </section>
        </Container>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

export default connect(mapStateToProps, {
  cartRemoveItem,
  increment,
  decrement,
  clearCart,
})(Cart);
