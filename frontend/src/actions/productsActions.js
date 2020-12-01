import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_SUCCESS
} from "../constants/productsConstants"
import Axios from 'axios';

function mensagem(error) {
    if (error.response && error.response.data.message) {
        return "Data :" + error.response.data.message;
    } else {
        return "Error :" + error.message;
    }
}
export const listProducts = () => async (dispacth) => {
    dispacth({
        type: PRODUCT_LIST_REQUEST,
    });

    try {
        const { data } = await Axios.get('/api/products');
        dispacth({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispacth({ type: PRODUCT_LIST_FAIL, payload: mensagem(error) });
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: mensagem(error)
        });

    }
}

export const createProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            '/api/products',
            {},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data.product,
        });
    } catch (error) {

        dispatch({ type: PRODUCT_CREATE_FAIL, payload: mensagem(error) });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product })
    const { userSignin: { userInfo }, } = getState();
    try {
        const { data } = await Axios.put(`/api/products/${product._id}`, product, {
            headers: { Authorization: `Baerer ${userInfo.token}` },
        })
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_UPDATE_FAIL, payload: mensagem(error) })
    }
}