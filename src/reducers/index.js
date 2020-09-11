import { combineReducers } from 'redux';
import video from './video';
import products from './products';
import productInDetails from './productInDetails';

export default combineReducers({
    video,
    products,
    productInDetails
});