import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";
import BsCore2 from "../bs-library/helpers/BsCore2";
import { resetFlags } from "./join";



/* NAMES */
export const ON_MERGE_GUEST_AND_ACTUALUSER_CARTS_RETURN = "ON_MERGE_GUEST_AND_ACTUALUSER_CARTS_RETURN";
export const ON_TRY_EXTENDING_CART_LIFESPAN_RETURN = "ON_TRY_EXTENDING_CART_LIFESPAN_RETURN";
export const ON_DELETE_CART_ITEM_RETURN = "ON_DELETE_CART_ITEM_RETURN";
export const ON_UPDATE_CART_ITEM_COUNT_RETURN = "ON_UPDATE_CART_ITEM_COUNT_RETURN";
export const ON_ADD_TO_CART_RETURN = "ON_ADD_TO_CART_RETURN";
export const ON_INIT_CART_RETURN = "ON_INIT_CART_RETURN";

// export const SET_CART_ID = "SET_CART_ID";
export const RESET_CART = "RESET_CART";
export const SET_CART = "SET_CART";



/* FUNCS */
export const onMergeGuestAndActualUserCartsReturn = (callBackData) => ({ type: ON_MERGE_GUEST_AND_ACTUALUSER_CARTS_RETURN, callBackData: callBackData });
export const onTryExtendingCartLifespanReturn = (callBackData) => ({ type: ON_TRY_EXTENDING_CART_LIFESPAN_RETURN, callBackData: callBackData });
export const onDeleteCartItemReturn = (callBackData) => ({ type: ON_DELETE_CART_ITEM_RETURN, callBackData: callBackData });
export const onUpdateCartItemCountReturn = (callBackData) => ({ type: ON_UPDATE_CART_ITEM_COUNT_RETURN, callBackData: callBackData });
export const onAddToCartReturn = (callBackData) => ({ type: ON_ADD_TO_CART_RETURN, callBackData: callBackData });
export const onInitCartReturn = (callBackData) => ({ type: ON_INIT_CART_RETURN, callBackData: callBackData });

// export const setCartId = (cartId) => ({ type: SET_CART_ID, cartId: cartId });
export const resetCart = () => ({ type: RESET_CART });
export const setCart = (obj) => ({ type: SET_CART, obj: obj });



/* AJAX FUNCS */
//bmd-ish
export const mergeGuestAndActualUserCarts = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/cart/mergeGuestAndActualUserCarts',
            method: data.bmdHttpRequest.method,
            params: data.params,
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onMergeGuestAndActualUserCartsReturn(callBackData));

            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onMergeGuestAndActualUserCartsReturn(callBackData));
            }
        });

    };

};



export const tryExtendingCartLifespan = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/cart/tryExtendingCartLifespan',
            method: data.bmdHttpRequest.method,
            params: data.params,
            callBackFunc: (requestData, json) => {
                Bs.log('In ACTION: cart, METHOD: tryExtendingCartLifespan() / callBackFunc()...');
                const callBackData = { ...data, ...json };
                dispatch(onTryExtendingCartLifespanReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onTryExtendingCartLifespanReturn(callBackData));
            }
        });

    };

};



export const updateCartItemCount = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/cart/updateCartItemCount',
            method: data.bmdHttpRequest.method,
            params: data.params,
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onUpdateCartItemCountReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onUpdateCartItemCountReturn(callBackData));
            }
        });

    };

};


//bmd-ish
export const deleteCartItem = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/cart/deleteCartItem',
            method: data.bmdHttpRequest.method,
            params: data.params,
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onDeleteCartItemReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onDeleteCartItemReturn(callBackData));
            }
        });

    };

};


//bmd-ish
export const onAddToCart = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/cart/addItem',
            method: data.bmdHttpRequest.method,
            params: data.params,
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onAddToCartReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onAddToCartReturn(callBackData));
            }
        });
    };

}



export const initCart = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/cart/read',
            method: data.bmdHttpRequest.method,
            params: data.bmdHttpRequest.params,
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onInitCartReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onInitCartReturn(callBackData));
            }
        });
    };

}