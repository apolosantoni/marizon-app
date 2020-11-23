import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrderScreen(props) {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment')
    }

    const toPrice = (num) => Number(num.toFixed(2)); // convert 5.123 to 5.2
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {

    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name :</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address :</strong> {cart.shippingAddress.address},{cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{cart.shippingAddress.country}<br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method :</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items :</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((item) => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img className="small" src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>
                                                        Quantity {item.qty} x R$ {item.price} = R$ {item.qty * item.price}
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li><strong>Order Sumary</strong></li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>R$ {cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>R$ {cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>R$ {cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div> <strong>R$ {cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block" type="submit" onClick={placeOrderHandler} disabled={cart.cartItems.lenght === 0}> Place Order</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};
