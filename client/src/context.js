import React, { Component, createContext } from 'react';
import { products } from './data';

export const ProductContext = createContext();

class ProductContextProvider extends Component {
  state = {
    products: [],
    product: {},
    cart: [],
    isModalOpen: false,
    modalProduct: {},
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  addToCart = (id) => {
    const tempProducts = [...this.state.products];
    const tempProduct = this.getItem(id);
    const product = tempProducts.find((prod) => prod.id === tempProduct.id);
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => this.addTotals()
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({ modalProduct: product, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalProduct: {}, isModalOpen: false });
  };

  increment = (id) => {
    const tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price;
    this.setState({ cart: [...tempCart] }, this.addTotals());
  };

  decrement = (id) => {
    const tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count -= 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState({ cart: [...tempCart] }, this.addTotals());
    }
  };

  removeItem = (id) => {
    const tempProducts = [...this.state.products];
    const tempCart = [...this.state.cart];
    const newCart = tempCart.filter((item) => item.id !== id);
    const removedItem = tempProducts.find((item) => item.id === id);
    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;
    this.setState({ cart: [...newCart], products: [...tempProducts] }, () =>
      this.addTotals()
    );
  };

  clearCart = () => {
    this.setState({ cart: [], cartSubTotal: 0, cartTax: 0, cartTotal: 0 }, () =>
      this.setProducts()
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState({ cartSubTotal: subTotal, cartTax: tax, cartTotal: total });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetails: this.handleDetails,
          addToCart: this.addToCart,
          getItem: this.getItem,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {/* <button onClick={() => this.tester()}>Test</button> */}
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export const ProductConsumer = ProductContext.Consumer;

export default ProductContextProvider;
