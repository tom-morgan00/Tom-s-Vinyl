import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  tableIcon: {
    margin: 0,
    minWidth: 0,
    padding: '0.4rem 0.6rem',
    borderRadius: '50%',
    backgroundColor: 'var(--mainLight)',
  },
});

export default function CartButtons({
  quantity,
  id,
  handleRemove,
  increment,
  decrement,
}) {
  const classes = useStyles();

  const handleIncrement = (id, qty) => {
    let tempQuantity = qty;
    tempQuantity += 1;
    increment(id, tempQuantity);
  };
  const handleDecrement = (id, qty) => {
    let tempQuantity = qty;
    tempQuantity -= 1;

    if (tempQuantity <= 0) {
      return handleRemove(id);
    }
    decrement(id, tempQuantity);
  };
  return (
    <>
      <Button
        onClick={() => handleIncrement(id, quantity)}
        variant="contained"
        className={classes.tableIcon}
      >
        <i className={`fas fa-plus `} />
      </Button>
      <h4
        style={{
          fontSize: '1.4rem',
          display: 'inline-block',
          padding: '0 0.8rem',
        }}
      >
        {quantity}
      </h4>
      <Button
        onClick={() => handleDecrement(id, quantity)}
        variant="contained"
        className={classes.tableIcon}
      >
        <i className="fas fa-minus" />
      </Button>
    </>
  );
}
