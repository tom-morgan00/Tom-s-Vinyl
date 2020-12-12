import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { hashPassword, getToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      status: 'failed',
      message: 'Incorrect email or password',
    });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      return res.status(200).json({
        status: 'success',
        message: 'Login success',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: getToken(user),
        },
      });
    } else {
      return res.json({
        status: 'failed',
        message: 'Incorrect email or password',
      });
    }
  });
});

userRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      status: 'failed',
      message: 'Must enter a name, email and password',
    });
  }

  const userTaken = await User.findOne({ email });
  if (userTaken) {
    return res.json({
      status: 'failed',
      message: 'That email address already exists',
    });
  }
  const newUser = await new User({
    name,
    email,
    password: hashPassword(password),
  });
  await newUser.save();
  const user = await User.findOne({ email });
  res.status(201).json({
    status: 'success',
    message: 'New user has been created',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: getToken(user),
    },
  });
});

export default userRouter;

// userRouter.get('/seed', async (req, res) => {
//   try {
//     await User.deleteMany({});
//     const users = await userData.map((user) => {
//       const { name, email, password } = user;

//       const newUser = new User({
//         name,
//         email,
//         password: hashPassword(password),
//       });
//       console.log(newUser);
//       newUser.save();
//       res.json({
//         status: 'success',
//         message: 'Create user successful',
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });
