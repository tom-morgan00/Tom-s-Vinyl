import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../actions/authActions';
import Loader from '../components/Reusable/Loader';

export default function LogOut(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const logOut = () => {
      dispatch(signOut());
      history.push('/');
    };
    logOut();
  }, []);
  return <Loader />;
}
