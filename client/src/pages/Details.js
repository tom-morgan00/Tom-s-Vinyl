import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ErrorMessage } from '../components/Reusable/ErrorMessage';
import Loader from '../components/Reusable/Loader';
import Title from '../components/Reusable/Title';
import { getProductByID, removeProduct } from '../actions/productActions';
import ProductDetails from '../components/ProductDetails';
import { cartAddItem } from '../actions/cartActions';

class Details extends Component {
  componentDidMount() {
    this.props.getProductByID(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.removeProduct();
  }
  render() {
    const { product, loading, error, cart } = this.props;

    return (
      <main>
        <Container maxWidth="lg">
          <Title title="Details" />
          <section>
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error.message} />
            ) : product ? (
              <ProductDetails
                cart={cart}
                product={product}
                cartAddItem={this.props.cartAddItem}
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
    product: state.product.product,
    cart: state.cart.items,
    loading: state.product.loading,
    error: state.product.error,
  };
};

export default connect(mapStateToProps, {
  getProductByID,
  removeProduct,
  cartAddItem,
})(Details);
