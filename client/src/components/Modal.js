import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { ButtonContainer } from './Button';

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(val) => {
          const { isModalOpen, closeModal } = val;
          const { title, artist, price, image } = val.modalProduct;

          if (!isModalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                    >
                      <h5>Item added to Cart</h5>
                      <img src={image} alt={title} className="img-fluid" />
                      <h5>{`${title} by ${artist}`}</h5>
                      <h5 className="text-muted">price: £{price}</h5>
                      <Link to="/">
                        <ButtonContainer onClick={() => closeModal()}>
                          Continue Shopping
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer cart onClick={() => closeModal()}>
                          Go to Cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  #modal {
    background-color: var(--mainWhite);
  }
`;
