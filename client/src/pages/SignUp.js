import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetError, signUp } from '../actions/authActions';
import Loader from '../components/Reusable/Loader';
import { ErrorMessage } from '../components/Reusable/ErrorMessage';
import { makeStyles } from '@material-ui/core';
import Title from '../components/Reusable/Title';

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

export default function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { auth } = useSelector((state) => state);
  const { loading, userInfo, error } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      return history.goBack();
    }
    return () => {
      if (error) dispatch(resetError());
    };
  }, [userInfo, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUp(name, email, password, password2));
    setName('');
    setEmail('');
    setPassword('');
    setPassword2('');
  };

  if (userInfo) {
    return null;
  }
  return (
    <div className="form">
      <form onSubmit={submitHandler} autoComplete="off">
        <ul className={classes.formContainer}>
          <Title title="sign up" />
          <li className={classes.formLi}>
            {loading && <Loader />}
            {error && <ErrorMessage message={error.message} />}
          </li>
          <li className={classes.formLi}>
            <label htmlFor="name">Name</label>
            <input
              required
              value={name}
              className={classes.input}
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li className={classes.formLi}>
            <label htmlFor="email">Email</label>
            <input
              required
              value={email}
              className={classes.input}
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li className={classes.formLi}>
            <label htmlFor="password">Password</label>
            <input
              required
              value={password}
              className={classes.input}
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li className={classes.formLi}>
            <label htmlFor="password2">Re-enter Password</label>
            <input
              required
              value={password2}
              className={classes.input}
              type="password"
              id="password2"
              name="password2"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </li>
          <li className={classes.formLi}>
            <button type="submit" className={classes.button}>
              Register
            </button>
          </li>
          <li>
            Already have an account?
            <Link to="/login"> Login</Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
