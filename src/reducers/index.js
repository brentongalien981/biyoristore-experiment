import { combineReducers } from 'redux';
import video from './video';
import products from './products';
import productInDetails from './productInDetails';
import cart from './cart';

export default combineReducers({
    video,
    products,
    productInDetails,
    cart
});