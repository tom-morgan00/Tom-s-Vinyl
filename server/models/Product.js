import mongoose from 'mongoose';
import { productsData } from '../data.js';

const productSchema = mongoose.Schema({
  title: String,
  artist: String,
  image: String,
  price: Number,
  year: Number,
  inCart: Boolean,
  count: Number,
  total: Number,
  tracklist: [String],
});

const Product = new mongoose.model('Product', productSchema);

export default Product;

// // SEEDING DATABASE
// (async () => {
//   try {
//     await Product.deleteMany({});
//     await productsData.map((prod) => {
//       const product = new Product({
//         title: prod.title,
//         artist: prod.artist,
//         image: prod.image,
//         price: prod.price,
//         year: prod.year,
//         tracklist: prod.tracklist,
//       });
//       product.save();
//     });
//   } catch (err) {
//     console.log(err);
//   }
// })();
