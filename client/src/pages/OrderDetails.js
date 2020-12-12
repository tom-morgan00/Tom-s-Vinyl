import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitOrder } from '../actions/orderActions';
import Title from '../components/Reusable/Title';
import SimpleModal from '../components/Reusable/Modal';

const useStyles = makeStyles((theme) => ({
  orderContainer: {
    fontSize: '1.6rem',
  },
  orderTop: {
    display: 'flex',
    alignItems: 'flex-start',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  orderInfo: {
    backgroundColor: 'var(--mainWhite)',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '2%',
    flexGrow: 1,
    margin: '2rem 3rem',
    maxWidth: '400px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  orderItemsInfo: {
    backgroundColor: 'var(--mainWhite)',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '2%',
    margin: '2rem 3rem',
    maxWidth: '100%',
  },
  button: {
    border: '0.1rem solid rgba(0, 0, 0, 0.2)',
    margin: '1rem 0',
    fontSize: '1.8rem',
    padding: '1rem 0.5rem',
    '&:hover': {
      cursor: 'pointer',
      color: 'var(--mainLight)',
      backgroundColor: 'var(--mainBlue)',
      border: '0.04rem solid rgba(0, 0, 0, 0.2)',
    },
  },
}));

export default function OrderDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orderInfo, loading, error } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.order);
  const { address, city, postCode, country } = shippingAddress;

  const calcTotal = (arr) => {
    return arr
      .map((item) => {
        const total = (item.quantity * item.price).toFixed(2);

        return +total;
      })
      .reduce((acc, cur) => {
        const total = (acc + cur).toFixed(2);

        return +total;
      }, 0);
  };

  const submitButton = (delivery, userInfo, items, totals) => {
    dispatch(submitOrder(delivery, userInfo, items, totals));
  };

  const deliveryFee = 2.99;
  const subtotal = calcTotal(items);
  const total = +(subtotal + deliveryFee).toFixed(2);
  const totals = {
    subtotal,
    deliveryFee,
    total,
  };

  return (
    <Container className={classes.orderContainer}>
      <Title title="order" />
      <section className={classes.orderTop}>
        <section className={classes.orderInfo}>
          <h3>Delivery Address</h3>
          <p>{`${address},`}</p>
          <p>{`${city},`}</p>

          <p>{`${country},`}</p>
          <p>{`${postCode}`}</p>
        </section>
        <section className={classes.orderInfo}>
          <h3>Order Summary</h3>
          <ul>
            <li>{`Items Cost: £${subtotal}`}</li>
            <li>{`Delivery Fee: £${deliveryFee}`}</li>
            <li>{`Total Cost: £${+total.toFixed(2)}`}</li>
            <li>
              <button
                onClick={() =>
                  submitButton(shippingAddress, userInfo, items, totals)
                }
                className={classes.button}
              >
                Place Order
              </button>
            </li>
          </ul>
        </section>
      </section>
      <section className={classes.orderItemsInfo}>
        <h3>Items</h3>
        <ul>
          {items.map(({ title, artist, price, quantity, _id }) => {
            return (
              <li key={_id} style={{ padding: '0.5rem 0' }}>
                <h4>{`${title} - ${artist}`}</h4>
                <p>{`£${price} x ${quantity} = £${price * quantity}`}</p>
              </li>
            );
          })}
        </ul>
      </section>
      {loading ? (
        <SimpleModal loading={loading} />
      ) : error ? (
        <SimpleModal error={error} />
      ) : orderInfo ? (
        <SimpleModal order={orderInfo} />
      ) : null}
    </Container>
  );
}
