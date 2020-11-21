import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productsActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    if (!product) {
        console.log(product)
    return <div className="alert alert-danger">Product not found !</div>
    };

    return (
        <div>
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? ( 
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
            <div>
                <div className="row top">
                    <Link to="/"> Back to Home</Link>
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name} />
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>{product.name}</li>
                            <li><Rating
                                rating={product.rating}
                                numReviews={product.numReviews} >
                            </Rating></li>
                            <li>Price : R$ {product.price}</li>
                            <li>Description :
                            <p> {product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price"> ${product.price}    </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div>
                                            {product.countInStock > 0 ? <span className="sucess">In Stock</span> : <span className="danger">Unvailable</span>}
                                        </div>
                                    </div>
                                </li>
                                {
                                    product.countInStock > 0 && (
                                <>
                                <li>
                                    <div className="row">
                                        <div>Qty</div>
                                        <div>
                                            <select 
                                            value={ qty } 
                                            onChange={ (e) => setQty( e.target.value )}>
                                                {
                                                    [...Array(product.countInStock).keys()].map( (x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button onClick={addToCartHandler}  className="primary block">Add to Cart </button>
                                </li>
                                </>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
          )
        }
        </div>
    )
}
