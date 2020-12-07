import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import productRouter from './routes/productRoutes.js';
import Product from './models/Product.js';
import { data } from './data.js';

//MONGO SETUP
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  } catch (err) {
    console.log(err);
  }
})();
const db = mongoose.connection;
db.on('open', () => {
  console.log('Connected to the MongoDB database.');
});
db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

//APP SETUP
const app = express();
app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/v1/products', productRouter);

app.get('/', (req, res) => {
  res.send("Tom's Vinyl Server");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
