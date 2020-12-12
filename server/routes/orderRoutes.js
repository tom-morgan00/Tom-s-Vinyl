import express from 'express';
import Order from '../models/Order.js';

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
  try {
    const { deliveryAddress, auth, order, totals } = req.body;
    const { subtotal, deliveryFee, total } = totals;
    const newOrder = new Order({
      customer: {
        _id: auth._id,
        name: auth.name,
        email: auth.email,
        address: deliveryAddress,
      },
      items: [...order.items],
      subtotal,
      deliveryFee,
      total,
    });

    const completedOrder = await newOrder.save();
    res.status(201).json({
      status: 'success',
      message: 'Order was successful',
      userMessage: `Thank you for your order, ${auth.name}`,
      order: completedOrder,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: 'failed',
      message: 'Something went wrong, your order was not successful',
    });
  }
});

export default orderRouter;
