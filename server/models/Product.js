import mongoose from 'mongoose';

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

const product = new mongoose.model('Product', productSchema);

export default product;

//SEEDING DATABASE
// (async () => {
//   try {
//     await Product.deleteMany({});
//     const products = data.map((prod) => {
//       const product = new Product({
//         title: prod.title,
//         artist: prod.artist,
//         image: prod.image,
//         price: prod.price,
//         year: prod.year,
//         inCart: prod.inCart,
//         count: prod.count,
//         total: prod.total,
//         tracklist: prod.tracklist,
//       });
//       product.save();
//     });
//   } catch (err) {
//     console.log(err);
//   }
// })();
