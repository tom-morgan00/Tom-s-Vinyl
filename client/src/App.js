import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/details/:id" exact component={Details} />
        {/* <Route path="/cart" exact component={Cart} />
        <Route component={Default} />  */}
      </Switch>
      {/* <Modal /> */}
    </>
  );
}

export default App;
