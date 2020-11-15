import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";



/* NAMES */
// export const SET_CART_ID = "SET_CART_ID";
export const RESET_CART = "RESET_CART";
export const ON_SHOULD_RESET_SETTING_CART_ITEM_COUNT_FLAG_SUCCESS = "ON_SHOULD_RESET_SETTING_CART_ITEM_COUNT_FLAG_SUCCESS";
export const ON_UPDATE_CART_ITEM_COUNT_FAIL = "ON_UPDATE_CART_ITEM_COUNT_FAIL";
export const ON_UPDATE_CART_ITEM_COUNT_SUCCESS = "ON_UPDATE_CART_ITEM_COUNT_SUCCESS";
export const ON_DELETE_CART_ITEM_FAIL = "ON_DELETE_CART_ITEM_FAIL";
export const ON_DELETE_CART_ITEM_SUCCESS = "ON_DELETE_CART_ITEM_SUCCESS";
export const ON_ADD_TO_CART_FAIL = "ON_ADD_TO_CART_FAIL";
export const ON_ADD_TO_CART_SUCCESS = "ON_ADD_TO_CART_SUCCESS";
export const SET_CART = "SET_CART";
export const ON_ADD_TO_CART = "ON_ADD_TO_CART";



/* FUNCS */
// export const setCartId = (cartId) => ({ type: SET_CART_ID, cartId: cartId });
export const resetCart = () => ({ type: RESET_CART });
export const onShouldResetSettingCartItemCountFlagSuccess = () => ({ type: ON_SHOULD_RESET_SETTING_CART_ITEM_COUNT_FLAG_SUCCESS });
export const onUpdateCartItemCountFail = (errors) => ({ type: ON_UPDATE_CART_ITEM_COUNT_FAIL, errors: errors });
export const onUpdateCartItemCountSuccess = (quantity, index) => ({ type: ON_UPDATE_CART_ITEM_COUNT_SUCCESS, quantity: quantity, index: index });
export const onDeleteCartItemFail = (errors) => ({ type: ON_DELETE_CART_ITEM_FAIL, errors: errors });
export const onDeleteCartItemSuccess = (cartItemIndex) => ({ type: ON_DELETE_CART_ITEM_SUCCESS, cartItemIndex: cartItemIndex });

export const onAddToCartFail = (errors) => ({
    type: ON_ADD_TO_CART_FAIL,
    errors: errors
});

export const onAddToCartSuccess = (obj) => ({
    type: ON_ADD_TO_CART_SUCCESS,
    obj: obj
});

export const setCart = (obj) => ({ type: SET_CART, obj: obj });



/* AJAX FUNCS */
export const updateCartItemCount = (cartItemId, quantity, index) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: updateCartItemCount()");

    return (dispatch) => { dispatch(onUpdateCartItemCountSuccess(quantity, index)); };


    // return (dispatch) => {

    //     BsCore.ajaxCrud({
    //         url: '/cartItem/update',
    //         method: "post",
    //         params: { api_token: BsAppSession.get("apiToken"), cartItemId: cartItemId, quantity: quantity },
    //         callBackFunc: (requestData, json) => {
    //             Bs.log("\n#####################");
    //             Bs.log("FILE: actions/cart.js, METHOD: updateCartItemCount() => ajaxCrud() => callBackFunc()");

    //             if (json.isResultOk) {
    //                 dispatch(onUpdateCartItemCountSuccess(quantity, index));
    //             }
    //         },
    //         errorCallBackFunc: (errors) => {
    //             dispatch(onUpdateCartItemCountFail(errors));
    //         }
    //     });
    // };
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



export const onAddToCart = (product) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: onAddToCart()");

    //
    return (dispatch) => { dispatch(onAddToCartSuccess(product)); };


    // //
    // return (dispatch) => {

    //     BsCore.ajaxCrud({
    //         url: '/cartItem/save',
    //         method: "post",
    //         params: { productId: productId, api_token: BsAppSession.get("apiToken") },
    //         callBackFunc: (requestData, json) => {
    //             Bs.log("\n#####################");
    //             Bs.log("FILE: actions/cart.js, METHOD: onAddToCart() => ajaxCrud() => callBackFunc()");

    //             dispatch(onAddToCartSuccess(json.obj));
    //         },
    //         errorCallBackFunc: (errors) => {
    //             dispatch(onAddToCartFail(errors));
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