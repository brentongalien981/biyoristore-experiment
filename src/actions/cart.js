import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";
import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const ON_UPDATE_CART_ITEM_COUNT_RETURN = "ON_UPDATE_CART_ITEM_COUNT_RETURN";
export const ON_ADD_TO_CART_RETURN = "ON_ADD_TO_CART_RETURN";
export const ON_INIT_CART_RETURN = "ON_INIT_CART_RETURN";

// export const SET_CART_ID = "SET_CART_ID";
export const RESET_CART = "RESET_CART";
export const ON_DELETE_CART_ITEM_FAIL = "ON_DELETE_CART_ITEM_FAIL";
export const ON_DELETE_CART_ITEM_SUCCESS = "ON_DELETE_CART_ITEM_SUCCESS";
export const SET_CART = "SET_CART";



/* FUNCS */
export const onUpdateCartItemCountReturn = (callBackData) => ({ type: ON_UPDATE_CART_ITEM_COUNT_RETURN, callBackData: callBackData });
export const onAddToCartReturn = (callBackData) => ({ type: ON_ADD_TO_CART_RETURN, callBackData: callBackData });
export const onInitCartReturn = (callBackData) => ({ type: ON_INIT_CART_RETURN, callBackData: callBackData });

// export const setCartId = (cartId) => ({ type: SET_CART_ID, cartId: cartId });
export const resetCart = () => ({ type: RESET_CART });

export const onDeleteCartItemFail = (errors) => ({ type: ON_DELETE_CART_ITEM_FAIL, errors: errors });
export const onDeleteCartItemSuccess = (cartItemIndex) => ({ type: ON_DELETE_CART_ITEM_SUCCESS, cartItemIndex: cartItemIndex });

export const setCart = (obj) => ({ type: SET_CART, obj: obj });



/* AJAX FUNCS */
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

export const deleteCartItem = (cartItemId, cartItemIndex) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: deleteCartItem()");

    //
    return (dispatch) => { dispatch(onDeleteCartItemSuccess(cartItemIndex)); };


    // return (dispatch) => {

    //     BsCore.ajaxCrud({
    //         url: '/cartItem/delete',
    //         method: "post",
    //         params: { api_token: BsAppSession.get("apiToken"), cartItemId: cartItemId },
    //         callBackFunc: (requestData, json) => {
    //             Bs.log("\n#####################");
    //             Bs.log("FILE: actions/cart.js, METHOD: deleteCartItem() => ajaxCrud() => callBackFunc()");

    //             dispatch(onDeleteCartItemSuccess(cartItemIndex));
    //         },
    //         errorCallBackFunc: (errors) => {
    //             dispatch(onDeleteCartItemFail(errors));
    //         }
    //     });
    // };
};



export const showCart = () => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: showCart()");

    //
    let cart = BsAppSession.get("cart");
    if (!cart || cart == "") { cart = null; }
    else { cart = JSON.parse(cart); }

    return (dispatch) => { dispatch(setCart(cart)); };


    // //
    // return (dispatch) => {

    //     BsCore.ajaxCrud({
    //         url: '/cart/show',
    //         params: { api_token: BsAppSession.get("apiToken") },
    //         callBackFunc: (requestData, json) => {
    //             Bs.log("\n#####################");
    //             Bs.log("FILE: actions/cart.js, METHOD: showCart() => ajaxCrud() => callBackFunc()");

    //             dispatch(setCart(json.obj));
    //         }
    //     });
    // };
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
                const callBackData = { ...json };
                dispatch(onInitCartReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onInitCartReturn(callBackData));
            }
        });
    };

}