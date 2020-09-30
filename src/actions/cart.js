import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";



/* NAMES */
export const SET_CART = "SET_CART";
export const ON_ADD_TO_CART = "ON_ADD_TO_CART";



/* FUNCS */
export const setCart = (obj) => ({ type: SET_CART, obj: obj });

export const onAddToCart = (event, productId) => ({
    type: ON_ADD_TO_CART,
    event: event,
    productId: productId
});



/* AJAX FUNCS */
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

                dispatch(setCart(json.objs));
            }
        });
    };
};