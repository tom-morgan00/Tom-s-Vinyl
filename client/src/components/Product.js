import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  const { _id, title, artist, image, price, inCart } = product;
  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        {product ? (
          <div className="img-container p-5">
            <Link to={`details/${_id}`}>
              <img src={image} alt={title} className="card-img-top" />
            </Link>
            <button
              className="cart-btn"
              disabled={inCart ? true : false}
              // onClick={() => {
              //   val.addToCart(id);
              //   val.openModal(id);
              // }}
            >
              {inCart ? (
                <p className="text-capialize mb-0" disabled>
                  in Cart
                </p>
              ) : (
                <i className="fas fa-cart-plus" />
              )}
            </button>
          </div>
        ) : null}

        <div className="footer d-flex justify-content-between">
          <p className="align-self-center mb-0">
            {title} - {artist}
          </p>
          <p className="text-blue font-italic mb-0">
            <span className="mr-1">£{price}</span>
          </p>
        </div>
      </div>
    </ProductWrapper>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    artist: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
    tracklist: PropTypes.arrayOf(String),
  }).isRequired,
};

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 0.5s linear;
  }
  .card-footer {
    background-color: transparent;
    border-top: transparent;
    transition: all 0.5s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background-color: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 0.5s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.1);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background-color: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.5s linear;
  }
  .img-container:hover .cart-btn {
    transform: translate(0%, 0%);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
  }
`;
