import React,{useEffect} from 'react';
import './App.css';
import {Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import ProductListPage from './pages/ProductListPage.js';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn,updateCart } from './redux/actions';
import './App.css'

function App() {
  
  const dispatch = useDispatch()
  const authState = useSelector((state)=>state.authState)

  useEffect(() => {
    if (!authState.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [authState.authenticate])

  useEffect(() => {
    dispatch(updateCart())
  }, [])
  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path='/account/orders' component={OrderPage} />
        <Route path="/order_details/:orderId" component={OrderDetailsPage} />
        <Route path = "/:productSlug/:productId/a" component = {ProductDetailPage}/>
        <Route path="/:slug" component={ProductListPage} />
      </Switch>
    </div>
  );
}

export default App;
