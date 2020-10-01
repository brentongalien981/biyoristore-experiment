import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";



/* NAMES */
export const ON_ADD_TO_CART_FAIL = "ON_ADD_TO_CART_FAIL";
export const ON_ADD_TO_CART_SUCCESS = "ON_ADD_TO_CART_SUCCESS";
export const SET_CART = "SET_CART";
export const ON_ADD_TO_CART = "ON_ADD_TO_CART";



/* FUNCS */
export const onAddToCartFail = (errors) => ({
    type: ON_ADD_TO_CART_FAIL,
    errors: errors
});

export const onAddToCartSuccess = () => ({
    type: ON_ADD_TO_CART_SUCCESS,
});

export const setCart = (obj) => ({ type: SET_CART, obj: obj });



/* AJAX FUNCS */
export const onAddToCart = (productId) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: onAddToCart()");


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/cartItem/save',
            method: "post",
            params: { productId: productId, api_token: BsAppSession.get("apiToken") },
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/cart.js, METHOD: onAddToCart() => ajaxCrud() => callBackFunc()");

                dispatch(onAddToCartSuccess());
            },
            errorCallBackFunc: (errors) => {
                dispatch(onAddToCartFail(errors));
            }
        });
    };
};

export const showCart = () => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: cart, METHOD: showCart()");


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/cart/show',
            params: { api_token: BsAppSession.get("apiToken") },
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/cart.js, METHOD: showCart() => ajaxCrud() => callBackFunc()");

                dispatch(setCart(json.obj));
            }
        });
    };
};