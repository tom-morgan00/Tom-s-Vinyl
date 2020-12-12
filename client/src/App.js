import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Default from './components/Default';
import Login from './pages/Login';
import SignOut from './pages/SignOut';
import SignUp from './pages/SignUp';
import Shipping from './pages/Shipping';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products/:id" exact component={Details} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/logout" exact component={SignOut} />
        <Route path="/shipping" exact component={Shipping} />
        <Route path="/order" exact component={OrderDetails} />
        <Route component={Default} />
      </Switch>
    </>
  );
}

export default App;
