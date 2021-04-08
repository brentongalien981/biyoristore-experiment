import BmdAuth from "../../../bs-library/core/BmdAuth";
import Bs from "../../../bs-library/helpers/Bs";
import BsCore2 from "../../../bs-library/helpers/BsCore2";
import BsJLS from "../../../bs-library/helpers/BsJLS";
import * as consts from "../constants/consts";


//bmd-ish
export const setNumOfTriesExtendingCartLifespan = (val) => {
    BsJLS.set('Cart-numOfTriesExtendingCartLifespan', val);
};



export const incrementNumOfTriesExtendingCartLifespan = () => {
    let num = getNumOfTriesExtendingCartLifespan() + 1;
    BsJLS.set('Cart-numOfTriesExtendingCartLifespan', num);
};



const getNumOfTriesExtendingCartLifespan = () => {
    let num = parseInt(BsJLS.get('Cart-numOfTriesExtendingCartLifespan'));
    if (!num && num !== 0) { num = consts.MAX_NUM_OF_RETRIES_EXTEND_CART_LIFESPAN; }
    return num;
};



export const setLatestTimeTryExtendingCartLifespan = () => {
    let latestTimeTry = parseInt(Date.now() / 1000);
    BsJLS.set('Cart-latestTimeTryExtendingCartLifespan', latestTimeTry);
};



const getLatestTimeTryExtendingCartLifespan = () => {
    let latestTimeTry = parseInt(BsJLS.get('Cart-latestTimeTryExtendingCartLifespan'));
    if (!latestTimeTry) {
        latestTimeTry = parseInt(Date.now() / 1000);
    }
    return latestTimeTry;
};



export const isItTimeToRetryExtendingCartLifespan = () => {

    if (getNumOfTriesExtendingCartLifespan() < consts.MAX_NUM_OF_RETRIES_EXTEND_CART_LIFESPAN) {

        const nowInSec = parseInt(Date.now() / 1000);
        const lastAttemptInSec = getLatestTimeTryExtendingCartLifespan();
        const elapsedTimeInSec = nowInSec - lastAttemptInSec;
    
        if (elapsedTimeInSec >= consts.INTERVAL_IN_SEC_TO_ALLOW_RETRY_EXTENDING_CART_LIFESPAN) {
            return true;
        }
    }

    return false;
};



export const initCartStatusDetailsBasedOnTime = () => {

    const nowInDateObj = new Date(Date.now());
    let cartStatus = BsJLS.get('cart.status');

    // Between 00:00 and 23:00, always set cart-status to available.
    if (nowInDateObj.getHours() >= consts.START_HOUR_OF_CART_BEING_TOTALLY_AVAILABLE
        && nowInDateObj.getHours() < consts.END_HOUR_OF_CART_BEING_TOTALLY_AVAILABLE
    ) {
        cartStatus = consts.CART_STATUS_AVAILABLE;
        setCartStatus(cartStatus);

        setLatestTimeTryExtendingCartLifespan();
        setNumOfTriesExtendingCartLifespan(0);
    }

    // Otherwise, just leave it.

};



export const getCartStatus = () => {

    return BsJLS.get('cart.status');
};



export const setCartStatus = (status) => {
    BsJLS.set('cart.status', status);
};



export const prepareCartBmdHttpRequestData = () => {
    let requestParams = { temporaryGuestUserId: BmdAuth.getTemporaryGuestUserId() };
    let requestMethod = 'get';

    if (BmdAuth.isLoggedIn()) {
        const bmdAuth = BmdAuth.getInstance();
        requestParams = {
            bmdToken: bmdAuth?.bmdToken,
            authProviderId: bmdAuth?.authProviderId
        };
        requestMethod = 'post';
    }

    const bmdHttpRequestData = {
        method: requestMethod,
        params: requestParams
    };

    return bmdHttpRequestData;
};