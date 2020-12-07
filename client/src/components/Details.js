import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductByID, removeProduct } from '../actions/productActions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

class Details extends Component {
  componentDidMount() {
    this.props.getProductByID(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.removeProduct();
  }
  render() {
    const { product, loading, error } = this.props;
    // prettier-ignore
    return (
        <div className="container py-5">
        <div className="row">
          <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
            <h1>Product Details</h1>
          </div>
        </div>
  
        <div className="row">
       
          {
            loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error.message} />
            ) : product ? (
              <>
                <div className="col-10 mx-auto col-md-6 my-3">
            <img src={product.image} alt={product.title} className="img-fluid" />
          </div>
 
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <h2>{product.title}</h2>
            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              {product.artist}
            </h4>
            <h4 className="text-blue">
              <strong>
                price: <span>£</span>
                {product.price}
              </strong>
            </h4>
           
            <h5 className="text-blue">year: {product.year}</h5>

            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              tracklist:
            </p>
            <TrackWrapper>
              {product.tracklist.length > 0
                ? product.tracklist.map((track, index) => {
                    return (
                      <li key={index + 1} className="track">
                        {index + 1} {track}
                      </li>
                    );
                  })
                : null}
            </TrackWrapper>
            {/* BUTTONS */}
            <Link to="/">
              <ButtonContainer>back to products</ButtonContainer>
            </Link>
            <ButtonContainer
              cart //passed cart prop to style components to change colors from blue to yellow
              disabled={product.inCart ? true : false}
              // onClick={() => {
              //   val.addToCart(id);
              //   val.openModal(id);
              // }}
            >
              {product.inCart ? 'in Cart' : 'add to cart'}
            </ButtonContainer>
          </div>
              </>
                
            ) : null }
        </div>
      </div>
      )
  }
}

const TrackWrapper = styled.ul`
  padding: 0.5rem 1rem;
  .track {
    list-style-type: none;
  }
`;

const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
  };
};

export default connect(mapStateToProps, { getProductByID, removeProduct })(
  Details
);
