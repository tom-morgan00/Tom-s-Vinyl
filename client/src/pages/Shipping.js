import React, { useEffect, useState } from 'react';
import Title from '../components/Reusable/Title';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setShippingAddress } from '../actions/orderActions';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  formContainer: {
    fontSize: '2rem',
    margin: '0 auto',
    marginTop: '5rem',
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    maxWidth: '400px',
    padding: '2rem',
    border: '0.1rem #c0c0c0 solid',
    backgroundColor: '#efefef',
    borderRadius: '0.5rem',
    listStyleType: 'none',
  },
  formLi: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  input: {
    fontSize: '1.6rem',
    padding: '1rem',
    border: '0.1rem #c0c0c0 solid',
    borderRadius: '0.5rem',
    outline: 'none',
  },
  button: {
    border: '0.1rem solid rgba(0, 0, 0, 0.2)',
    margin: '1rem 0',
    fontSize: '1.8rem',
    padding: '1rem 0.5rem',
    '&:hover': {
      cursor: 'pointer',
      color: 'var(--mainLight)',
      backgroundColor: 'var(--mainBlue)',
      border: '0.04rem solid rgba(0, 0, 0, 0.2)',
    },
  },
});

export default function OrderScreen() {
  const classes = useStyles();
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const { auth, order } = useSelector((state) => state);
  const { userInfo } = auth;
  const { shippingAddress } = order;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      return history.push('/login');
    }
    if (shippingAddress) {
      const { address, city, postCode, country } = shippingAddress;
      setAddress(address);
      setCity(city);
      setPostCode(postCode);
      setCountry(country);
    }
  }, [userInfo, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setShippingAddress(address, city, postCode, country));
    setAddress('');
    setCity('');
    setPostCode('');
    setCountry('');
    history.push('/order');
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler} autoComplete="off">
        <ul className={classes.formContainer}>
          <Title title="shipping" />
          <li className={classes.formLi}>
            <label htmlFor="address">Address</label>
            <input
              required
              className={classes.input}
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </li>
          <li className={classes.formLi}>
            <label htmlFor="city">City</label>
            <input
              required
              className={classes.input}
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </li>

          <li className={classes.formLi}>
            <label htmlFor="postCode">Post Code</label>
            <input
              required
              className={classes.input}
              type="text"
              id="postCode"
              name="postCode"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
            />
          </li>
          <li className={classes.formLi}>
            <label htmlFor="country">Country</label>
            <input
              required
              className={classes.input}
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </li>
          <li className={classes.formLi}>
            <button type="submit" className={classes.button}>
              Continue
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
