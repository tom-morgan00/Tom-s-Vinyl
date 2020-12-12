import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
  country: String,
  postCode: String,
});

const orderItemSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  title: String,
  artist: String,
  image: String,
  price: Number,
  quantity: Number,
});

const customerSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  email: String,
  address: addressSchema,
});

const orderSchema = mongoose.Schema({
  customer: customerSchema,
  items: [orderItemSchema],
  subtotal: Number,
  deliveryFee: Number,
  total: Number,
});

const Order = new mongoose.model('Order', orderSchema);

export default Order;
