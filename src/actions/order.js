import Bs from "../bs-library/helpers/Bs";
import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const ON_SHOW_ORDER_RETURN = "ON_SHOW_ORDER_RETURN";



/* FUNCS */
export const onShowOrderReturn = (objs = null) => ({ type: ON_SHOW_ORDER_RETURN, objs: objs });



/* AJAX FUNCS */
export const showOrder = (objs) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: order, METHOD: showOrder()");


    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/' + objs.orderId,
            callBackFunc: (requestData, json) => { dispatch(onShowOrderReturn(json.objs)); },
            errorCallBackFunc: (errors) => { dispatch(onShowOrderReturn()); }
        });
    };
};