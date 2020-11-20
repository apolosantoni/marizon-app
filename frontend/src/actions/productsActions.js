import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productsConstants"
import Axios from 'axios';

export const listProducts = () => async (dispacth) => {
    dispacth({
        type: PRODUCT_LIST_REQUEST
    });

    try{
        const { data } = await Axios.get('api/products');
        dispacth({type: PRODUCT_LIST_SUCCESS, payload: data});
    }catch(error){
        dispacth({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}