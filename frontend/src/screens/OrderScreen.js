import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) :
            (
                <div>
                    <h1>ORDER ID : {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name :</strong> {order.shippingAddress.fullName} <br />
                                            <strong>Address :</strong> {order.shippingAddress.address},{order.shippingAddress.city}, {order.shippingAddress.postalCode},{order.shippingAddress.country}<br />
                                        </p>
                                        {order.isDelivered ?
                                            (<MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>) :
                                            (<MessageBox variant="danger">Not Delivered</MessageBox>})
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method :</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ?
                                            (<MessageBox variant="success">Paid at {order.PaidAt}</MessageBox>) :
                                            (<MessageBox variant="danger">Not Paid</MessageBox>})
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items :</h2>
                                        <ul>
                                            {
                                                order.orderItems.map((item) => (
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
                                            <div>R$ {order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping</div>
                                            <div>R$ {order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>R$ {order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Order Total</strong></div>
                                            <div> <strong>R$ {order.totalPrice.toFixed(2)}</strong></div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
};