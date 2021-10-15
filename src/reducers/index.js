import { combineReducers } from 'redux';
import video from './video';
import products from './products';
import productInDetails from './productInDetails';
import cart from './cart';
import join from './join';
import profile from './profile';
import checkout from './checkout';
import order from './order';
import home from './home';
import temporaryAlerts from './temporaryAlerts';
import appStateManager from './appStateManager';
import search from './search';
import bmdtest from './bmdtest'; // BMD-ON-STAGING: Comment-out on deployment.

export default combineReducers({
    video,
    products,
    productInDetails,
    cart,
    join,
    profile,
    checkout,
    order,
    temporaryAlerts,
    appStateManager,
    bmdtest,
    home,
    search
});