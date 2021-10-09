import { RETRIEVED_DATA_FROM_LOCAL_STORAGE } from "../bs-library/constants/global";
import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const ON_READ_FEATURED_PRODUCTS_RETURN = "ON_READ_FEATURED_PRODUCTS_RETURN";



/* FUNCS */
export const onReadFeaturedProductsReturn = (callBackData) => ({ type: ON_READ_FEATURED_PRODUCTS_RETURN, callBackData: callBackData });



/* AJAX FUNCS */
export const readFeaturedProducts = (data = {}) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/products/featured',
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onReadFeaturedProductsReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode, isResultOk: false };
                dispatch(onReadFeaturedProductsReturn(callBackData));
            }
        });
    };
};