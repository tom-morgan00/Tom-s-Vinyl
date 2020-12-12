import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Loader from './Loader';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    fontSize: '1.6rem',
    position: 'absolute',
    width: '80%',
    maxWidth: '400px',
    backgroundColor: 'var(--mainWhite)',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '3rem',
    [theme.breakpoints.down('xs')]: {
      padding: '2rem 1rem',
      fontSize: '1.4rem',
    },
  },
  title: {
    marginBottom: '2rem',
  },
  button: {
    border: '0.1rem solid rgba(0, 0, 0, 0.2)',
    margin: '2rem 0',
    fontSize: '1.8rem',
    padding: '1rem 2rem',
    '&:hover': {
      cursor: 'pointer',
      color: 'var(--mainLight)',
      backgroundColor: 'var(--mainBlue)',
      border: '0.04rem solid rgba(0, 0, 0, 0.2)',
    },
  },
}));

export default function SimpleModal({ loading, error, order }) {
  useEffect(() => {
    if (loading) {
      setOpen(true);
    }
  }, [loading]);
  const classes = useStyles();
  const history = useHistory();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const onSuccessClose = () => {
    setOpen(false);
    history.push('/');
  };
  let body;

  if (loading) {
    body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 className={classes.title} id="simple-modal-title">
          Loading
        </h2>
        <Loader />
        <p id="simple-modal-description">Won't be long.</p>
      </div>
    );
  }

  if (order) {
    body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 className={classes.title} id="simple-modal-title">
          {order.message}
        </h2>
        <p id="simple-modal-description">{order.userMessage}</p>
        <button className={classes.button} onClick={onSuccessClose}>
          Close
        </button>
      </div>
    );
  }

  if (error) {
    body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 className={classes.title} id="simple-modal-title">
          Error
        </h2>
        <p id="simple-modal-description">{error.message}</p>
        <button className={classes.button} onClick={handleClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
