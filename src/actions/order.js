import Bs from "../bs-library/helpers/Bs";
import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const ON_SHOW_ORDER_RETURN = "ON_SHOW_ORDER_RETURN";



/* FUNCS */
export const onShowOrderReturn = (callBackData) => ({ type: ON_SHOW_ORDER_RETURN, callBackData: callBackData });



/* AJAX FUNCS */
export const showOrder = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/' + data.orderId,
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onShowOrderReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onShowOrderReturn(callBackData));
            }
        });
    };
};