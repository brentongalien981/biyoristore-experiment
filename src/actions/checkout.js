import BsCore2 from "../bs-library/helpers/BsCore2";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";
import { resetCart } from "./cart";
import BsKeys from "../bs-library/helpers/BsKeys";
import axios from "axios";
import BmdAuth from "../bs-library/core/BmdAuth";



/* NAMES */
export const RESET_CHECKOUT_FINALIZATION_PAGE_FLAGS = "RESET_CHECKOUT_FINALIZATION_PAGE_FLAGS";
export const ON_DO_ORDER_INVENTORY_CHECKS_RETURN = "ON_DO_ORDER_INVENTORY_CHECKS_RETURN";

export const SET_PAYMENT_METHOD = "SET_PAYMENT_METHOD";
export const SET_SHIPPING_INFO = "SET_SHIPPING_INFO";
export const SET_SHIPMENT_RATE = "SET_SHIPMENT_RATE";
export const RESET_REDUCER_INIT_VARS = "RESET_REDUCER_INIT_VARS";
// export const FINALIZE_SHOW_SHIPPING_DETAILS = "FINALIZE_SHOW_SHIPPING_DETAILS";

export const ON_GET_SHIPPING_RATES_FAIL = "ON_GET_SHIPPING_RATES_FAIL";
export const ON_GET_SHIPPING_RATES_RETURN = "ON_GET_SHIPPING_RATES_RETURN";

// export const ON_ADDRESS_SELECTION_CHANGE = "ON_ADDRESS_SELECTION_CHANGE";

export const END_PAYMENT_FINALIZATION_PROCESS = "END_PAYMENT_FINALIZATION_PROCESS"; // BMD-DELETE

export const RESET_FINALIZATION_OBJS = "RESET_FINALIZATION_OBJS";
export const ON_FINALIZE_ORDER_RETURN = "ON_FINALIZE_ORDER_RETURN";
// export const ON_FINALIZE_ORDER_FAIL = "ON_FINALIZE_ORDER_FAIL";
// export const ON_FINALIZE_ORDER_SUCCESS = "ON_FINALIZE_ORDER_SUCCESS";
export const SET_PREDEFINED_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE = "SET_PREDEFINED_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE";
export const SET_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE = "SET_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE";
export const SET_PAYMENT_PAGE_ENTRY_CODE = "SET_PAYMENT_PAGE_ENTRY_CODE";
export const SET_CHECKOUT_FINALIZATION_PAGE_ENTRY_CODE = "SET_CHECKOUT_FINALIZATION_PAGE_ENTRY_CODE";
export const ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS = "ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS";
export const ON_READ_CHECKOUT_REQUIRED_DATA_FAIL = "ON_READ_CHECKOUT_REQUIRED_DATA_FAIL";



/* FUNCS */
export const resetCheckoutFinalizationPageFlags = () => ({ type: RESET_CHECKOUT_FINALIZATION_PAGE_FLAGS });
export const onDoOrderInventoryChecksReturn = (callBackData) => ({ type: ON_DO_ORDER_INVENTORY_CHECKS_RETURN, callBackData: callBackData });

export const setPaymentMethod = (paymentMethod) => ({ type: SET_PAYMENT_METHOD, paymentMethod: paymentMethod });
export const setShippingInfo = (shippingInfo) => ({ type: SET_SHIPPING_INFO, shippingInfo: shippingInfo });
export const setShipmentRate = (shipmentRate) => ({ type: SET_SHIPMENT_RATE, shipmentRate: shipmentRate });
export const resetReducerInitVars = () => ({ type: RESET_REDUCER_INIT_VARS });
// export const finalizeShowShippingDetails = () => ({ type: FINALIZE_SHOW_SHIPPING_DETAILS });

export const onGetShippingRatesFail = () => ({ type: ON_GET_SHIPPING_RATES_FAIL });
export const onGetShippingRatesReturn = (callBackData) => ({ type: ON_GET_SHIPPING_RATES_RETURN, callBackData: callBackData });

// export const onAddressSelectionChange = (e, i) => ({ type: ON_ADDRESS_SELECTION_CHANGE, e: e, i: i });
export const endPaymentFinalizationProcess = () => ({ type: END_PAYMENT_FINALIZATION_PROCESS }); // BMD-DELETE
export const resetFinalizationObjs = () => ({ type: RESET_FINALIZATION_OBJS });

export const onFinalizeOrderReturn = (callBackData) => ({ type: ON_FINALIZE_ORDER_RETURN, callBackData: callBackData });

// export const onFinalizeOrderFail = () => ({ type: ON_FINALIZE_ORDER_FAIL });
// export const onFinalizeOrderSuccess = () => ({ type: ON_FINALIZE_ORDER_SUCCESS });
export const setPredefinedPaymentFinalizationPageEntryCode = () => ({ type: SET_PREDEFINED_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE });
export const setPaymentFinalizationPageEntryCode = () => ({ type: SET_PAYMENT_FINALIZATION_PAGE_ENTRY_CODE });
export const setPaymentPageEntryCode = () => ({ type: SET_PAYMENT_PAGE_ENTRY_CODE });
export const setCheckoutFinalizationPageEntryCode = () => ({ type: SET_CHECKOUT_FINALIZATION_PAGE_ENTRY_CODE });
export const onReadCheckoutRequiredDataSuccess = (objs) => ({ type: ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS, objs: objs });
export const onReadCheckoutRequiredDataFail = (callBackData) => ({ type: ON_READ_CHECKOUT_REQUIRED_DATA_FAIL, callBackData: callBackData });



/* AJAX FUNCS */
export const getShippingRates = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/customized-easypost/getRates',
            // url: '/customized-easypost/test',
            params: {
                reducedCartItemsData: data.reducedCartItemsData,
                shippingInfo: data.shippingInfo
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onGetShippingRatesReturn(callBackData));
                dispatch(setShippingInfo(data.shippingInfo));
                dispatch(setPaymentMethod(data.paymentMethod));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onGetShippingRatesFail(callBackData));
            }
        });

    };
};



export const finalizeOrderWithPredefinedPayment = (objs) => {

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

                const objs = { paymentProcessStatusCode: json.paymentProcessStatusCode, orderProcessStatusCode: json.orderProcessStatusCode, order: json.order };
                dispatch(onFinalizeOrderReturn(objs));

                const PAYMENT_METHOD_CHARGED = 2;
                if (json.paymentProcessStatusCode === PAYMENT_METHOD_CHARGED) {
                    dispatch(resetCart());
                }
            },
            errorCallBackFunc: (errors) => {
                dispatch(onFinalizeOrderReturn());
            }
        });
    };
};



export const doOrderInventoryChecks = (data) => {

    return (dispatch) => {

        const bmdAuth = BmdAuth.getInstance();

        BsCore2.ajaxCrud({
            url: '/checkout/doOrderInventoryChecks',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                temporaryGuestUserId: BmdAuth.getTemporaryGuestUserId()
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onDoOrderInventoryChecksReturn(callBackData));

            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onDoOrderInventoryChecksReturn(callBackData));
            }
        });

    };

};



export const finalizeOrder = (data) => {

    return (dispatch) => {

        const bmdAuth = BmdAuth.getInstance();

        BsCore2.ajaxCrud({
            url: '/checkout/finalizeOrder',
            method: 'post',
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                temporaryGuestUserId: BmdAuth.getTemporaryGuestUserId(),
                cartId: data.cartId, 
                ...data.shippingInfo 
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onFinalizeOrderReturn(callBackData));
                dispatch(resetCart(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onFinalizeOrderReturn(callBackData));
                dispatch(resetCart(callBackData));
            }
        });
    };
};



export const readCheckoutRequiredData = () => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/checkout/readCheckoutRequiredData',
            method: 'post',
            params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId },
            callBackFunc: (requestData, json) => {
                dispatch(onReadCheckoutRequiredDataSuccess(json.objs));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadCheckoutRequiredDataFail(callBackData));
            }
        });
    };
};