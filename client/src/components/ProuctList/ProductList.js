import { Grid } from '@material-ui/core';
import React from 'react';
import Product from './Product';

export default function ProductList({ cart, products, cartAddItem }) {
  return (
    <Grid container spacing={3}>
      {products
        ? products.map((product) => {
            return (
              <Product
                key={product._id}
                cart={cart}
                product={product}
                cartAddItem={cartAddItem}
              />
            );
          })
        : null}
    </Grid>
  );
}
