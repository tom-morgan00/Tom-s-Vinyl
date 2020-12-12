import React from 'react';
// prettier-ignore
import { Grid, Card, CardContent, CardActions, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    padding: '1rem',
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
    '&:hover': {
      border: '0.04rem solid rgba(0, 0, 0, 0.2)',
      boxShadow: '2px 2px 5px 0 rgba(0, 0, 0, 0.2)',
    },
  },
  cardImageContainer: {},
  cardContent: {
    padding: '0.5rem',

    margin: 0,
  },
  cardImage: {
    width: '100%',
    margin: '0 auto',
    overflow: 'hidden',
  },
  cardButtons: {
    padding: 0,
    margin: 0,
  },
  cardButton: {
    margin: 0,
    fontSize: '1.2rem',
    padding: '0 0.5rem',
    '&:hover': {
      color: 'var(--mainLight)',
      backgroundColor: 'var(--mainBlue)',
      border: '0.04rem solid rgba(0, 0, 0, 0.2)',
    },
  },
  cardInCart: {
    position: 'absolute',
    fontSize: '2rem',
    color: 'var(--mainLight)',
    top: 0,
    right: 0,
    backgroundColor: 'var(--mainBlue)',
    padding: '0.5rem 0.5rem',
    borderBottomLeftRadius: '15%',
  },
});

export default function Product({ product, cartAddItem, cart }) {
  const classes = useStyles();
  const { _id, title, artist, image, price } = product;
  const itemInCart = cart.some((item) => item._id === _id);

  return (
    <Grid key={_id} item xs={12} sm={4} md={3}>
      <Card className={classes.card}>
        {itemInCart ? (
          <span className={classes.cardInCart}>
            <i className="fas fa-shopping-cart" />
          </span>
        ) : null}

        <div className={classes.cardImageContainer}>
          <Link to={`/products/${_id}`}>
            <img src={image} alt={title} className={classes.cardImage} />
          </Link>
        </div>
        <CardContent className={classes.cardContent}>
          <h4 style={{ margin: 0 }}>{title}</h4>
          <h5 style={{ margin: 0 }}>{artist}</h5>
          <h5 style={{ margin: 0 }}>{`£${price}`}</h5>
        </CardContent>
        <CardActions className={classes.cardButtons}>
          {itemInCart ? (
            <Button
              className={classes.cardButton}
              size="medium"
              color="primary"
              onClick={() => cartAddItem(_id)}
              disabled
            >
              In Cart
            </Button>
          ) : (
            <Button
              className={classes.cardButton}
              size="medium"
              color="primary"
              onClick={() => cartAddItem(_id)}
            >
              Add to Cart
            </Button>
          )}

          <Link to={`/products/${_id}`}>
            <Button
              className={classes.cardButton}
              size="medium"
              color="primary"
            >
              Details
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
