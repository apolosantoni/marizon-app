import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch()

  const singoutHandle = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/"> marizon </Link>
          </div>
          <div>
            <Link to="/cart">Cart {
              cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )
            }
            </Link>{
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li><Link to="/profile" >Profile</Link></li>
                    <li><Link to="/orderhistory" >Order History</Link></li>
                    <li><Link to="#signout" onClick={singoutHandle}>Sign Out</Link></li>
                  </ul>
                </div>
              ) : (
                  <Link to="/signin">Sing In</Link>
                )
            }

          </div>
        </header>
        <main>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/signin' component={SigninScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/shipping' component={ShippingAddressScreen} />
          <Route path='/payment' component={PaymentMethodScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/orderhistory' component={OrderHistoryScreen} />
        </main>
        <footer className="row center">
          All right reserved
      </footer>
      </div>
    </BrowserRouter >
  );
}

export default App;
