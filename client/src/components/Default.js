import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  pageNotFound: {
    position: 'absolute',
    margin: 0,
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '2rem',
  },
});

export default function Default() {
  const location = useLocation();
  const classes = useStyles();
  return (
    <div className={classes.pageNotFound}>
      <div className="text-title">
        <h1>404 error</h1>
        <h2>page not found</h2>
        <h3 style={{ fontFamily: 'Open Sans' }}>
          the requeseted URL
          <span>{`  "${location.pathname}"  `}</span>
          was not found
        </h3>
      </div>
    </div>
  );
}
