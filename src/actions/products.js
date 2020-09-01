import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";

export const READ_PRODUCTS = "READ_PRODUCTS";
export const AJAX_READ_PRODUCTS = "AJAX_READ_PRODUCTS";



export const ajaxReadProducts = (objs) => ({
    type: AJAX_READ_PRODUCTS,
    objs: objs
});



export const readProducts = () => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products',
            params: {},
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/products.js, METHOD: readProducts() => ajaxCrud() => callBackFunc()");

                dispatch(ajaxReadProducts(json.objs));
            }
        });
    };
};