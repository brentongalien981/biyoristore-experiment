import BmdAuth from "../../../bs-library/core/BmdAuth";
import Bs from "../../../bs-library/helpers/Bs";
import BsCore2 from "../../../bs-library/helpers/BsCore2";
import BsJLS from "../../../bs-library/helpers/BsJLS";
import * as consts from "../constants/consts";


//bmd-ish
export const getCartStatus = () => {

    let cartStatus = BsJLS.get('cart.status');

    switch (cartStatus) {
        case consts.CART_STATUS_AVAILABLE:
        case consts.CART_STATUS_EXTENDING_CART_LIFESPAN:
            break;
        default:
            cartStatus = consts.CART_STATUS_AVAILABLE;
            setCartStatus(cartStatus);
            break;
    }

    return cartStatus;
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