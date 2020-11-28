import Axios from 'axios';
import { CART_EMPTY } from "../constants/cartConstants";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_SUCCESS

} from "../constants/orderConstants";

function mensagem(error) {
    if (error.response && error.response.data.message) {
        return error.response.data.message;
    } else {
        return error.message;
    }
};

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                user_id: `${userInfo._id}`,
            },
            user: { users: { userInfo } },
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem("cartItems");
    } catch (error) {
        //const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: mensagem(error)
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                user_id: `${userInfo._id}`,
            },
            user: { userInfo },
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        //const message = error.response && error.response.data.message ? error.response.data.message: error.message;

        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: mensagem(error)
        });
    }
};

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            header: {
                Authorization: `Bearer ${userInfo.token}`,
                user_id: `${userInfo._id}`,
            },
            user: { userInfo },

        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

    } catch (error) {
        //const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_PAY_FAIL,
            payload: mensagem(error)
        });
    }

};

export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    //console.log("listOrderMine : " + userInfo._id);
    try {
        const { data } = await Axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                user_id: `${userInfo._id}`,
            },
            user: { userInfo },
        });
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });

    } catch (error) {
        //const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: mensagem(error) });
    }

};