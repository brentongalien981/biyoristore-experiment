import BsCore2 from "../bs-library/helpers/BsCore2";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";
import { resetCart } from "./cart";
import BsKeys from "../bs-library/helpers/BsKeys";
import axios from "axios";



/* NAMES */
export const SET_SHIPMENT_RATE = "SET_SHIPMENT_RATE";
export const RESET_REDUCER_INIT_VARS = "RESET_REDUCER_INIT_VARS";
export const DO_GET_SHIPPING_RATES_FINALIZATION_PROCESS = "DO_GET_SHIPPING_RATES_FINALIZATION_PROCESS";
// export const FINALIZE_SHOW_SHIPPING_DETAILS = "FINALIZE_SHOW_SHIPPING_DETAILS";
export const ON_GET_SHIPPING_RATES_FAIL = "ON_GET_SHIPPING_RATES_FAIL";
export const ON_GET_SHIPPING_RATES_RETURN = "ON_GET_SHIPPING_RATES_RETURN";
// export const ON_ADDRESS_SELECTION_CHANGE = "ON_ADDRESS_SELECTION_CHANGE";
export const END_PAYMENT_FINALIZATION_PROCESS = "END_PAYMENT_FINALIZATION_PROCESS";
export const RESET_FINALIZATION_OBJS = "RESET_FINALIZATION_OBJS";
export const ON_FINALIZE_ORDER_RETURN = "ON_FINALIZE_ORDER_RETURN";
// export const ON_FINALIZE_ORDER_FAIL = "ON_FINALIZE_ORDER_FAIL";
// export const ON_FINALIZE_ORDER_SUCCESS = "ON_FINALIZE_ORDER_SUCCESS";
export const SET_PREDEFINED_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE = "SET_PREDEFINED_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE";
export const SET_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE = "SET_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE";
export const SET_PAYMENT_PAGE_ENTRY_CODE = "SET_PAYMENT_PAGE_ENTRY_CODE";
export const SET_CHECKOUT_FINALIZATION_PAGE_ENTRY_CODE = "SET_CHECKOUT_FINALIZATION_PAGE_ENTRY_CODE";
export const ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS = "ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS";



/* FUNCS */
export const setShipmentRate = (shipmentRate) => ({ type: SET_SHIPMENT_RATE, shipmentRate: shipmentRate });
export const resetReducerInitVars = () => ({ type: RESET_REDUCER_INIT_VARS });
export const doGetShippingRatesFinalizationProcess = () => ({ type: DO_GET_SHIPPING_RATES_FINALIZATION_PROCESS });
// export const finalizeShowShippingDetails = () => ({ type: FINALIZE_SHOW_SHIPPING_DETAILS });
export const onGetShippingRatesFail = () => ({ type: ON_GET_SHIPPING_RATES_FAIL });
export const onGetShippingRatesReturn = (objs) => ({ type: ON_GET_SHIPPING_RATES_RETURN, objs: objs });
// export const onAddressSelectionChange = (e, i) => ({ type: ON_ADDRESS_SELECTION_CHANGE, e: e, i: i });
export const endPaymentFinalizationProcess = () => ({ type: END_PAYMENT_FINALIZATION_PROCESS });
export const resetFinalizationObjs = () => ({ type: RESET_FINALIZATION_OBJS });
export const onFinalizeOrderReturn = (objs = null) => ({ type: ON_FINALIZE_ORDER_RETURN, objs: objs });
// export const onFinalizeOrderFail = () => ({ type: ON_FINALIZE_ORDER_FAIL });
// export const onFinalizeOrderSuccess = () => ({ type: ON_FINALIZE_ORDER_SUCCESS });
export const setPredefinedPaymentFinalizationPageEntryCode = () => ({ type: SET_PREDEFINED_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE });
export const setPaymentFinalizationPageEntryCode = () => ({ type: SET_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE });
export const setPaymentPageEntryCode = () => ({ type: SET_PAYMENT_PAGE_ENTRY_CODE });
export const setCheckoutFinalizationPageEntryCode = () => ({ type: SET_CHECKOUT_FINALIZATION_PAGE_ENTRY_CODE });
export const onReadCheckoutRequiredDataSuccess = (objs) => ({ type: ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS, objs: objs });



/* AJAX FUNCS */
export const getShippingRates = (params) => {

    Bs.log("\n\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    Bs.log("In ACTION: checkout, METHOD: getShippingRates()");
    Bs.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");


    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/customized-easypost/getRates',
            // url: '/customized-easypost/test',
            params: {
                reducedCartItemsData: params.reducedCartItemsData,
                shippingInfo: params.shippingInfo
            },
            callBackFunc: (requestData, json) => {

                Bs.log("\n@@@@@@@@@@@@@@@@@@@@");
                Bs.log("START OF ACTION: checkout, METHOD: getShippingRates() => ajaxCrud() => callBackFunc()");
                Bs.log("@@@@@@@@@@@@@@@@@@@@");

                dispatch(onGetShippingRatesReturn(json.objs));

                Bs.log("\n####################");
                Bs.log("END OF ACTION: checkout, METHOD: getShippingRates() => ajaxCrud() => callBackFunc()");
                Bs.log("####################");
            },
            errorCallBackFunc: (errors) => {
                dispatch(onGetShippingRatesFail());
            }
        });

    };
};



export const finalizeOrderWithPredefinedPayment = (objs) => {

    Bs.log("\n\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    Bs.log("In ACTION: checkout, METHOD: finalizeOrderWithPredefinedPayment()");
    Bs.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");


    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/checkout/finalizeOrderWithPredefinedPayment',
            method: "post",
            params: {
                api_token: BsAppSession.get("apiToken"),
                paymentMethodId: objs.paymentMethodId,
                cartItemsInfo: objs.cartItemsInfo,
                ...objs.shippingInfo
            },
            neededResponseParams: ["paymentProcessStatusCode", "orderProcessStatusCode", "order"],
            callBackFunc: (requestData, json) => {

                Bs.log("\n@@@@@@@@@@@@@@@@@@@@");
                Bs.log("START OF ACTION: checkout, METHOD: finalizeOrderWithPredefinedPayment() => ajaxCrud() => callBackFunc()");
                Bs.log("@@@@@@@@@@@@@@@@@@@@");

                const objs = { paymentProcessStatusCode: json.paymentProcessStatusCode, orderProcessStatusCode: json.orderProcessStatusCode, order: json.order };
                dispatch(onFinalizeOrderReturn(objs));

                const PAYMENT_METHOD_CHARGED = 2;
                if (json.paymentProcessStatusCode === PAYMENT_METHOD_CHARGED) {
                    dispatch(resetCart());
                }


                Bs.log("\n####################");
                Bs.log("END OF ACTION: checkout, METHOD: finalizeOrderWithPredefinedPayment() => ajaxCrud() => callBackFunc()");
                Bs.log("####################");
            },
            errorCallBackFunc: (errors) => {
                dispatch(onFinalizeOrderReturn());
            }
        });
    };
};



export const finalizeOrder = (cartId, shippingInfo) => {

    Bs.log("\n###############");
    Bs.log("In ACTION: checkout, METHOD: finalizeOrder()");


    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/checkout/finalizeOrder',
            method: "post",
            params: { cartId: cartId, ...shippingInfo },
            neededResponseParams: ["paymentProcessStatusCode", "orderProcessStatusCode", "order"],
            callBackFunc: (requestData, json) => {

                Bs.log("\n#####################");
                Bs.log("ACTION: checkout, METHOD: finalizeOrder() => ajaxCrud() => callBackFunc()");

                const objs = { orderProcessStatusCode: json.orderProcessStatusCode, order: json.order };
                dispatch(onFinalizeOrderReturn(objs));
                dispatch(resetCart());
            },
            errorCallBackFunc: (errors) => {
                dispatch(onFinalizeOrderReturn());
                dispatch(resetCart());
            }
        });
    };
};



export const readCheckoutRequiredData = () => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: login()");


    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/checkout/readCheckoutRequiredData',
            method: "post",
            params: { api_token: BsAppSession.get("apiToken") },
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/checkout.js, METHOD: readCheckoutRequiredData() => ajaxCrud() => callBackFunc()");

                Bs.log("\njson.objs.addresses => ...");
                Bs.log(json.objs.addresses);

                dispatch(onReadCheckoutRequiredDataSuccess(json.objs));
            }
        });
    };
};