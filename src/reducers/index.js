import { combineReducers } from 'redux';
import video from './video';
import products from './products';

export default combineReducers({
    video,
    products
});