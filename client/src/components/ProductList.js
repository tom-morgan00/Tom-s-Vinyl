import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { connect } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

class ProductList extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products, loading, error } = this.props;
    return (
      <>
        <div className="py-5">
          <div className="container">
            <Title title="our products" />
            <div className="row">
              {loading ? (
                <Loader />
              ) : error ? (
                <ErrorMessage message={error.message} />
              ) : products ? (
                products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error,
  };
};

export default connect(mapStateToProps, { getProducts })(ProductList);
