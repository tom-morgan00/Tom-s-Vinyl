import express from 'express';
import Product from '../models/Product.js';

const productRouter = express.Router();

//ROUTES

//GET ALL PRODUCTS
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length) {
      res.status(200).json({
        status: 'success',
        data: {
          products,
        },
      });
    } else {
      res.status(404).send('No Products Found!');
      console.log('No Products Found!');
    }
  } catch (err) {
    res.status(404).send('Product Not Found!');
    console.log(err);
  }
});

//GET ONE PRODUCT
productRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json({
        status: 'success',
        data: {
          product,
        },
      });
    } else {
      res.status(404).send('Product Not Found!');
    }
  } catch (err) {
    res.status(404).send('Product Not Found!');
    console.log(err);
  }
});

export default productRouter;
