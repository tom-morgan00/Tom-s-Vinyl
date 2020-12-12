import { Button, Grid, List, ListItem } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import { ButtonContainer } from './Reusable/Button';

const useStyles = makeStyles((theme) => ({
  productDetails: {
    margin: '3rem 0',
    padding: '2rem',
    fontSize: '1.6rem',
    backgroundColor: 'var(--mainWhite)',
  },
  detailsTop: {
    padding: '2rem 0',
  },
  detailsBottom: {
    padding: '2rem 3rem',
  },
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    width: '70%',
    margin: '0 auto',
    maxWidth: '300px',
  },
  infoContainer: {
    fontSize: '2rem',
    position: 'relative',
  },
  infoList: {
    paddingLeft: '2rem',
    margin: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    [theme.breakpoints.down('xs')]: {
      position: 'relative',

      padding: '2rem 1rem',
    },
  },
  detailsLi: {
    padding: '0.2rem',
  },
  bottomPara: {
    padding: '0 2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  trackTitle: {
    marginTop: '2rem',
    fontSize: '2rem',
    textAlign: 'center',
  },
  trackUl: {
    width: '80%',
    maxWidth: '1000px',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  trackLi: {
    borderBottom: '0.1rem solid rgba(0, 0, 0, 0.2)',
  },
  cartButton: {
    border: '0.1rem solid rgba(0, 0, 0, 0.2)',
    margin: '1rem 0',
    fontSize: '1.4rem',
    padding: '0.2 0.5rem',
    '&:hover': {
      color: 'var(--mainLight)',
      backgroundColor: 'var(--mainBlue)',
      border: '0.04rem solid rgba(0, 0, 0, 0.2)',
    },
  },
}));

export default function ProductDetails({ product, cartAddItem, cart }) {
  const classes = useStyles();
  const { _id, title, artist, image, tracklist, price, year } = product;
  const itemInCart = cart.some((item) => item._id === _id);

  return (
    <section className={classes.productDetails}>
      <section className={classes.detailsTop}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <div className={classes.imageContainer}>
              <img src={image} alt={title} className={classes.image} />
            </div>
          </Grid>
          <Grid className={classes.infoContainer} item xs={12} sm={6} md={6}>
            <List className={classes.infoList}>
              <ListItem className={classes.detailsLi}>
                <h2>{`${title} (${year})`}</h2>
              </ListItem>
              <ListItem className={classes.detailsLi}>
                <h3>{artist}</h3>
              </ListItem>
              <ListItem className={classes.detailsLi}>
                <p>{`£${price}`}</p>
              </ListItem>
              <ListItem className={classes.detailsLi}>
                {itemInCart ? (
                  <Button
                    className={classes.cartButton}
                    size="medium"
                    color="primary"
                    onClick={() => cartAddItem(_id)}
                    disabled
                  >
                    In Cart
                  </Button>
                ) : (
                  <Button
                    className={classes.cartButton}
                    size="medium"
                    color="primary"
                    onClick={() => cartAddItem(_id)}
                  >
                    Add to Cart
                  </Button>
                )}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </section>
      <section className={classes.detailsBottom}>
        <p className={classes.bottomPara}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosq.
        </p>
        <h5 className={classes.trackTitle}>Tracks</h5>
        <List className={classes.trackUl}>
          {tracklist.map((track, index) => {
            return (
              <ListItem className={classes.trackLi} key={index + 1}>{`${
                index + 1
              }: ${track}`}</ListItem>
            );
          })}
        </List>
      </section>
    </section>
  );
}
