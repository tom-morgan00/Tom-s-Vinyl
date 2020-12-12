import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CartButtons from './CartButtons';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    backgroundColor: 'var(--mainDark)',
  },
  tableHead: {
    fontSize: '1.8rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    color: 'var(--mainWhite)',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  tableBody: {
    fontSize: '1.6rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--mainWhite)',
    borderBottom: '1px solid #dedede',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      flexDirection: 'column',
      padding: '2rem 0',
    },
  },
  tableBodyText: {
    width: '30%',
    padding: '0.8rem',
    [theme.breakpoints.down('xs')]: {
      // fontSize: '1.6rem',
      width: '80%',
    },
  },
  tableBodyNums: {
    width: '10%',
    textAlign: 'center',
    padding: '0.4rem 0.6rem',
    [theme.breakpoints.down('xs')]: {
      // fontSize: '1.8rem',
      width: '80%',
    },
  },
  tableButtons: {
    width: '20%',
    textAlign: 'center',
    padding: '0.8rem',
    // fontSize: '1.4rem',
    [theme.breakpoints.down('xs')]: {
      // fontSize: '1.8rem',
      width: '80%',
    },
  },

  tableRemove: {
    width: '10%',
    textAlign: 'center',
    padding: '0.8rem',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  trashIcon: {
    fontSize: '2rem',
    backgroundColor: 'var(--mainRed)',
    color: 'var(--mainWhite)',
    minWidth: 0,
    padding: '0.4rem 0.8rem',
    '&:hover': {
      backgroundColor: '#d40000',
    },
  },
  tableImage: {
    width: '20%',
    padding: '0.8rem',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  image: {
    maxWidth: '150px',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
}));

export default function CartItemList({
  items,
  cartRemoveItem,
  increment,
  decrement,
}) {
  const classes = useStyles();
  const handleRemove = (id) => {
    cartRemoveItem(id);
  };
  const calcItemTotal = (qty, price) => {
    const total = (qty * price).toFixed(2);
    return +total;
  };

  return (
    <table className={classes.table}>
      <thead className={classes.tableHead}>
        <th className={classes.tableImage}>
          <h4>Image</h4>
        </th>
        <th className={classes.tableBodyText}>
          <h4>Product</h4>
        </th>
        <th className={classes.tableBodyNums}>
          <h4>Price</h4>
        </th>
        <th className={classes.tableButtons}>
          <h4>Quantity</h4>
        </th>
        <th className={classes.tableRemove}>
          <h4>Remove</h4>
        </th>
        <th className={classes.tableBodyNums}>
          <h4>Total</h4>
        </th>
      </thead>

      {items.map((item) => {
        return (
          <tbody className={classes.tableBody} key={item._id}>
            <td className={classes.tableImage}>
              <img
                className={classes.image}
                src={item.image}
                alt={item.title}
              />
            </td>
            <td className={classes.tableBodyText}>
              <strong>{item.title}</strong>
              <br />
              {item.artist}
            </td>
            <td className={classes.tableBodyNums}>{`£${item.price}`}</td>
            <td className={classes.tableButtons}>
              <CartButtons
                width="30%"
                id={item._id}
                quantity={item.quantity}
                handleRemove={handleRemove}
                increment={increment}
                decrement={decrement}
              />
            </td>
            <td
              onClick={() => handleRemove(item._id)}
              className={classes.tableRemove}
            >
              <Button variant="contained" className={classes.trashIcon}>
                <i className="fas fa-trash" />
              </Button>
            </td>
            <td className={classes.tableBodyNums}>
              {`£${calcItemTotal(item.quantity, item.price)}`}
            </td>
          </tbody>
        );
      })}
    </table>
  );
}
