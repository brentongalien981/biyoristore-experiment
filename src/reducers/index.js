import { combineReducers } from 'redux';
import video from './video';
import products from './products';
import productInDetails from './productInDetails';
import cart from './cart';
import join from './join';
import profile from './profile';
import checkout from './checkout';

export default combineReducers({
    video,
    products,
    productInDetails,
    cart,
    join,
    profile,
    checkout
});