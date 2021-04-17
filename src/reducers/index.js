import { combineReducers } from 'redux';
import video from './video';
import products from './products';
import productInDetails from './productInDetails';
import cart from './cart';
import join from './join';
import profile from './profile';
import checkout from './checkout';
import order from './order';
import temporaryAlerts from './temporaryAlerts';
import appStateManager from './appStateManager';
import bmdtest from './bmdtest'; // bmd-todo:ON-DEPLOYMENT: Comment-out on deployment.

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
    bmdtest
});