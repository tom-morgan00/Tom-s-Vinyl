import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles({
  title: {
    fontSize: '2rem',
  },
  alert: {
    fontSize: '1.5rem',
    border: '1px solid var(--mainRed)',
    borderRadius: '2%',
  },
});

export const SuccessMessage = ({ message }) => {
  const classes = useStyles();
  return (
    <div className={classes.title}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export const ErrorMessage = ({ message }) => {
  const classes = useStyles();
  return (
    <div>
      <Alert className={classes.alert} severity="error">
        <AlertTitle className={classes.title}>Error</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};
