import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";

export const READ_PRODUCTS = "READ_PRODUCTS";
export const AJAX_READ_PRODUCTS = "AJAX_READ_PRODUCTS";



export const ajaxReadProducts = (objs, paginationData) => ({
    type: AJAX_READ_PRODUCTS,
    objs: objs,
    paginationData: paginationData
});



export const readProducts = (params) => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products',
            neededResponseParams: ["paginationData"],
            params: {...params},
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/products.js, METHOD: readProducts() => ajaxCrud() => callBackFunc()");
                Bs.log("\nJSON.ERRORS ==> ...");
                Bs.log(json.errors);
                Bs.log(json.objs);

                dispatch(ajaxReadProducts(json.objs, json.paginationData));
            }
        });
    };
};