import { RETRIEVED_DATA_FROM_LOCAL_STORAGE } from "../bs-library/constants/global";
import BmdAuth from "../bs-library/core/BmdAuth";
import Bs from "../bs-library/helpers/Bs";
import BsCore2 from "../bs-library/helpers/BsCore2";
import BsJLSOLM from "../bs-library/helpers/BsJLSOLM";
import TemporaryAlertSystem from "../components/temporary-alert-system/TemporaryAlertSystem";
import { queueAlert } from "./temporaryAlerts";



/* NAMES */
export const ON_SHOW_ORDER_RETURN = "ON_SHOW_ORDER_RETURN";
export const ON_REQUEST_FOR_RETURN_RETURN = "ON_REQUEST_FOR_RETURN_RETURN";



/* FUNCS */
export const onShowOrderReturn = (callBackData) => ({ type: ON_SHOW_ORDER_RETURN, callBackData: callBackData });
export const onRequestForReturnReturn = (callBackData) => ({ type: ON_REQUEST_FOR_RETURN_RETURN, callBackData: callBackData });



/* AJAX FUNCS */
export const showOrder = (data) => {

    const bsJLSObjQuery = 'orderPageData?orderId=' + data.orderId;
    data.bsJLSObjQuery = bsJLSObjQuery;

    if (!BsJLSOLM.shouldObjWithQueryRefresh(bsJLSObjQuery)) {
        const callBackData = { 
            ...data, 
            isResultOk: true, 
            retrievedDataFrom: RETRIEVED_DATA_FROM_LOCAL_STORAGE 
        };
        return onShowOrderReturn(callBackData);
    }



    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/' + data.orderId,
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onShowOrderReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode, isResultOk: false };
                dispatch(onShowOrderReturn(callBackData));
            }
        });
    };
};



export const requestForReturn = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/returns/requestForReturn',
            method: 'post',
            params: { 
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                ...data.params },
            callBackFunc: (requestData, json) => {

                if (json.isResultOk) {
                    const msg = "Order Return Placed! We'll get back to you through email within 1-4 hrs. Thank you :)";
                    const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: msg });
                    dispatch(queueAlert(newAlertObj));
                }

                const callBackData = { ...data, ...json };
                dispatch(onRequestForReturnReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode, isResultOk: false };
                dispatch(onRequestForReturnReturn(callBackData));
            }
        });
    };
};