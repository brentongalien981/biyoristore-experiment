import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";
import BsCore2 from "../bs-library/helpers/BsCore2";
import BmdAuth from "../bs-library/core/BmdAuth";
import BsJLSOLM from "../bs-library/helpers/BsJLSOLM";
import { queueAlert } from "./temporaryAlerts";
import TemporaryAlertSystem from "../components/temporary-alert-system/TemporaryAlertSystem";



/* NAMES */
export const ON_SET_PROFILE_FAIL = "ON_SET_PROFILE_FAIL";

export const ON_SAVE_ACCOUNT_RETURN = "ON_SAVE_ACCOUNT_RETURN";

export const ON_READ_ORDERS_RETURN = "ON_READ_ORDERS_RETURN";
export const ON_ADDRESS_DELETE_FAIL = "ON_ADDRESS_DELETE_FAIL";
export const ON_ADDRESS_DELETE_SUCCESS = "ON_ADDRESS_DELETE_SUCCESS";
export const ON_ADDRESS_FORM_RESET_SUCCESS = "ON_ADDRESS_FORM_RESET_SUCCESS";
export const ON_SAVE_ADDRESS_FAIL = "ON_SAVE_ADDRESS_FAIL";
export const ON_SAVE_ADDRESS_SUCCESS = "ON_SAVE_ADDRESS_SUCCESS";
// export const ON_PAYMENT_FORM_RESET_SUCCESS = "ON_PAYMENT_FORM_RESET_SUCCESS";
export const ON_SAVE_PAYMENT_FAIL = "ON_SAVE_PAYMENT_FAIL";
export const ON_SAVE_PAYMENT_SUCCESS = "ON_SAVE_PAYMENT_SUCCESS";

export const DO_POST_SAVE_PAYMENT_FINALIZATION = "DO_POST_SAVE_PAYMENT_FINALIZATION";

export const ON_SAVE_PROFILE_FAIL = "ON_SAVE_PROFILE_FAIL";
export const ON_SAVE_PROFILE_SUCCESS = "ON_SAVE_PROFILE_SUCCESS";
export const ON_PROFILE_DISPLAYED_SUCCESS = "ON_PROFILE_DISPLAYED_SUCCESS";
export const SET_PROFILE = "SET_PROFILE";



/* FUNCS */
export const onSetProfileFail = () => ({ type: ON_SET_PROFILE_FAIL, });

export const onSaveAccountReturn = (callBackData) => ({ type: ON_SAVE_ACCOUNT_RETURN, callBackData: callBackData });

export const onReadOrdersReturn = (objs = null) => ({ type: ON_READ_ORDERS_RETURN, objs: objs });
export const onAddressDeleteFail = () => ({ type: ON_ADDRESS_DELETE_FAIL });
export const onAddressDeleteSuccess = (addressId) => ({ type: ON_ADDRESS_DELETE_SUCCESS, addressId: addressId });
export const onAddressFormResetSuccess = () => ({ type: ON_ADDRESS_FORM_RESET_SUCCESS });
export const onSaveAddressFail = (errors) => ({ type: ON_SAVE_ADDRESS_FAIL, errors: errors });
export const onSaveAddressSuccess = (address, addressFormCrudMethod) => ({ type: ON_SAVE_ADDRESS_SUCCESS, address: address, addressFormCrudMethod: addressFormCrudMethod });
// export const onPaymentFormResetSuccess = () => ({ type: ON_PAYMENT_FORM_RESET_SUCCESS });
export const onSavePaymentFail = (errors) => ({ type: ON_SAVE_PAYMENT_FAIL, errors: errors });
export const onSavePaymentSuccess = (newPayment, paymentFormCrudMethod) => ({ type: ON_SAVE_PAYMENT_SUCCESS, newPayment: newPayment, paymentFormCrudMethod: paymentFormCrudMethod });
export const doPostSavePaymentFinalization = () => ({ type: DO_POST_SAVE_PAYMENT_FINALIZATION });

export const onSaveProfileFail = (callBackData) => ({ type: ON_SAVE_PROFILE_FAIL, callBackData: callBackData });
export const onSaveProfileSuccess = (callBackData) => ({ type: ON_SAVE_PROFILE_SUCCESS, callBackData: callBackData });
export const onProfileDisplayedSuccess = () => ({ type: ON_PROFILE_DISPLAYED_SUCCESS });
export const setProfile = (callBackData) => ({ type: SET_PROFILE, callBackData: callBackData, });



/* AJAX FUNCS */
export const saveAccount = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/users/update',
            method: 'post',
            params: {
                bmdToken: bmdAuth.bmdToken, authProviderId: bmdAuth.authProviderId,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onSaveAccountReturn(callBackData));
            },
            errorCallBackFunc: (errors) => {
                const callBackData = { ...data, errors: errors };
                dispatch(onSaveAccountReturn(callBackData));
            },
        });
    };
};



export const readOrders = (data) => {

    if (!BmdAuth.isLoggedIn()) { return onReadOrdersReturn({ errors: {} }); }

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/read',
            method: 'post',
            params: {
                bmdToken: bmdAuth.bmdToken, authProviderId: bmdAuth.authProviderId,
                pageNum: data.pageNum
            },
            callBackFunc: (requestData, json) => {
                json.objs.isResultOk = json.isResultOk;
                json.objs.pageNum = data.pageNum;
                dispatch(onReadOrdersReturn(json.objs));
            },
            errorCallBackFunc: (errors) => {
                dispatch(onReadOrdersReturn({ errors: errors }));
            }
        });
    };
};



export const onAddressDelete = (addressId) => {

    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/address/destroy',
            method: "post",
            params: { api_token: BsAppSession.get("apiToken"), addressId: addressId },
            // neededResponseParams: ["address"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: onAddressDelete() => ajaxCrud() => callBackFunc()");

                if (json.isResultOk) {
                    dispatch(onAddressDeleteSuccess(addressId));
                }
            },
            errorCallBackFunc: (errors) => {
                dispatch(onAddressDeleteFail(errors));
            }
        });
    };
};

export const saveAddress = (address, addressFormCrudMethod) => {

    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/address/save',
            method: "post",
            params: { ...address, api_token: BsAppSession.get("apiToken") },
            neededResponseParams: ["address"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: saveAddress() => ajaxCrud() => callBackFunc()");

                if (json.isResultOk) {
                    dispatch(onSaveAddressSuccess(json.address, addressFormCrudMethod));
                }
            },
            errorCallBackFunc: (errors) => {
                dispatch(onSaveAddressFail(errors));
            }
        });
    };
};

export const savePayment = (newPayment, paymentFormCrudMethod) => {

    const url = (paymentFormCrudMethod == "create" ? "/stripePaymentMethod/save" : "/stripePaymentMethod/update");

    return (dispatch) => {

        BsCore.ajaxCrud({
            url: url,
            method: "post",
            params: { ...newPayment, api_token: BsAppSession.get("apiToken") },
            neededResponseParams: ["newPayment"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: savePayment() => ajaxCrud() => callBackFunc()");

                if (json.isResultOk) {
                    dispatch(onSavePaymentSuccess(json.newPayment, paymentFormCrudMethod));
                }

                if (json.customErrors) {
                    dispatch(onSavePaymentFail(json.customErrors));
                }
            },
            errorCallBackFunc: (errors) => {
                dispatch(onSavePaymentFail(errors));
            }
        });
    };
};



export const saveProfile = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/profile/save',
            method: "post",
            params: { 
                bmdToken: bmdAuth.bmdToken, authProviderId: bmdAuth.authProviderId, 
                ...data.profile
            },
            callBackFunc: (requestData, json) => {

                const callBackData = { ...data, ...json };

                if (json.isResultOk) {
                    dispatch(onSaveProfileSuccess(callBackData));

                    const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: 'Personal data saved.' });
                    dispatch(queueAlert(newAlertObj));
                    
                } else {
                    dispatch(onSaveProfileFail(callBackData));
                }
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSaveProfileFail(callBackData));
            }
        });
    };
};



export const readProfile = () => {

    if (!BmdAuth.isLoggedIn()) { return onSetProfileFail(); }


    // Read from local-storage.
    if (
        !BsJLSOLM.shouldObjWithPathRefresh('profile.personalData')
        && !BsJLSOLM.shouldObjWithPathRefresh('profile.stripePaymentInfos')
        && !BsJLSOLM.shouldObjWithPathRefresh('profile.addresses')
    ) {
        return setProfile({ resultCode: 2 });
    }


    // Read from the backend.
    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/profile/show',
            method: 'post',
            params: { bmdToken: bmdAuth.bmdToken, authProviderId: bmdAuth.authProviderId, },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...json };
                dispatch(setProfile(callBackData));
            },
            errorCallBackFunc: (errors) => {
                dispatch(onSetProfileFail());
            },
        });
    };






};