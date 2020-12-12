import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { cartAddItem } from '../actions/cartActions';
import ProductList from '../components/ProuctList/ProductList';
import Title from '../components/Reusable/Title';
import Loader from '../components/Reusable/Loader';
import { ErrorMessage } from '../components/Reusable/ErrorMessage';
import { Container } from '@material-ui/core';

class Home extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products, loading, error, cartAddItem, cart } = this.props;

    return (
      <main id="home">
        <Container maxWidth="lg">
          <Title title="Products" />
          <section>
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error.message} />
            ) : products ? (
              <ProductList
                cart={cart}
                products={products}
                cartAddItem={cartAddItem}
              />
            ) : null}
          </section>
        </Container>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    cart: state.cart.items,
    loading: state.products.loading,
    error: state.products.error,
  };
};

export default connect(mapStateToProps, { getProducts, cartAddItem })(Home);
