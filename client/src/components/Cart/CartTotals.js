import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  totalsContainer: {
    marginTop: '3rem',
    position: 'relative',
    textAlign: 'right',
  },
  totalsCard: {
    textAlign: 'right',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  total: {
    fontSize: '2rem',
  },
  cardButtons: {
    padding: 0,
    margin: 0,
  },
  buttons: {
    margin: 0,
    fontSize: '1.2rem',
    padding: '0.5rem 1rem',
    '&:hover': {
      color: 'var(--mainLight)',
      backgroundColor: 'var(--mainBlue)',
      border: '0.04rem solid rgba(0, 0, 0, 0.2)',
    },
  },
  clearCart: {
    color: 'var(--mainRed)',
    '&:hover': {
      backgroundColor: 'var(--mainRed)',
    },
  },
});

export default function CartTotals({ items, clearCart }) {
  const classes = useStyles();
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

  const calcTotalItems = (arr) => {
    return arr
      .map((item) => item.quantity)
      .reduce((acc, cur) => {
        const total = acc + cur;
        return +total;
      }, 0);
  };

  return (
    <section className={classes.totalsContainer}>
      <Card className={classes.totalsCard}>
        <CardContent>
          <h2 className={classes.total}>{`Total: £${calcTotal(items)}`}</h2>
          <h3
            style={{ fontSize: '1.8rem' }}
            className={classes.total}
          >{`Items: ${calcTotalItems(items)}`}</h3>
        </CardContent>
        <CardActions>
          <Link to="/shipping">
            <Button className={classes.buttons} size="medium" color="primary">
              Checkout
            </Button>
          </Link>
          <br />
          <Button
            className={`${classes.buttons} ${classes.clearCart}`}
            size="medium"
            color="primary"
            onClick={() => clearCart()}
          >
            Clear Cart
          </Button>
        </CardActions>
      </Card>
    </section>
  );
}
