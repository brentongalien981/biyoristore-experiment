import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";
import BsCore2 from "../bs-library/helpers/BsCore2";
import BmdAuth from "../bs-library/core/BmdAuth";
import BsJLSOLM from "../bs-library/helpers/BsJLSOLM";
import { queueAlert } from "./temporaryAlerts";
import TemporaryAlertSystem from "../components/temporary-alert-system/TemporaryAlertSystem";
import { RETRIEVED_DATA_FROM_LOCAL_STORAGE } from "../bs-library/constants/global";



/* NAMES */
export const ON_SET_PROFILE_FAIL = "ON_SET_PROFILE_FAIL";

export const ON_SAVE_ACCOUNT_RETURN = "ON_SAVE_ACCOUNT_RETURN";

export const ON_READ_ORDERS_RETURN = "ON_READ_ORDERS_RETURN";

export const ON_ADDRESS_DELETE_FAIL = "ON_ADDRESS_DELETE_FAIL";
export const ON_ADDRESS_DELETE_SUCCESS = "ON_ADDRESS_DELETE_SUCCESS";

export const ON_SAVE_ADDRESS_FAIL = "ON_SAVE_ADDRESS_FAIL";
export const ON_SAVE_ADDRESS_SUCCESS = "ON_SAVE_ADDRESS_SUCCESS";

export const ON_DELETE_PAYMENT_METHOD_RETURN = "ON_DELETE_PAYMENT_METHOD_RETURN";
export const ON_SAVE_PAYMENT_FAIL = "ON_SAVE_PAYMENT_FAIL";
export const ON_SAVE_PAYMENT_SUCCESS = "ON_SAVE_PAYMENT_SUCCESS";

export const ON_SAVE_PROFILE_FAIL = "ON_SAVE_PROFILE_FAIL";
export const ON_SAVE_PROFILE_SUCCESS = "ON_SAVE_PROFILE_SUCCESS";
export const ON_PROFILE_DISPLAYED_SUCCESS = "ON_PROFILE_DISPLAYED_SUCCESS";
export const SET_PROFILE = "SET_PROFILE";



/* FUNCS */
export const onSetProfileFail = () => ({ type: ON_SET_PROFILE_FAIL, });

export const onSaveAccountReturn = (callBackData) => ({ type: ON_SAVE_ACCOUNT_RETURN, callBackData: callBackData });

export const onReadOrdersReturn = (callBackData) => ({ type: ON_READ_ORDERS_RETURN, callBackData: callBackData });

export const onAddressDeleteFail = (callBackData) => ({ type: ON_ADDRESS_DELETE_FAIL, callBackData: callBackData });
export const onAddressDeleteSuccess = (callBackData) => ({ type: ON_ADDRESS_DELETE_SUCCESS, callBackData: callBackData });
export const onSaveAddressFail = (callBackData) => ({ type: ON_SAVE_ADDRESS_FAIL, callBackData: callBackData });
export const onSaveAddressSuccess = (callBackData) => ({ type: ON_SAVE_ADDRESS_SUCCESS, callBackData: callBackData });

export const onDeletePaymentMethodReturn = (callBackData) => ({ type: ON_DELETE_PAYMENT_METHOD_RETURN, callBackData: callBackData });
export const onSavePaymentFail = (callBackData) => ({ type: ON_SAVE_PAYMENT_FAIL, callBackData: callBackData });
export const onSavePaymentSuccess = (callBackData) => ({ type: ON_SAVE_PAYMENT_SUCCESS, callBackData: callBackData });

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

    const readQuery = 'userOrders?pageNum=' + data.pageNum;
    if (!BsJLSOLM.shouldObjWithQueryRefresh(readQuery)) {
        const callBackData = { ...data, isResultOk: true, retrievedDataFrom: RETRIEVED_DATA_FROM_LOCAL_STORAGE };
        return onReadOrdersReturn(callBackData);
    }


    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/orders/read',
            method: 'post',
            params: {
                bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId,
                pageNum: data.pageNum
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onReadOrdersReturn(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onReadOrdersReturn(callBackData));
            }
        });
    };
};


//bmd-ish
export const deletePaymentMethod = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/stripePaymentMethod/delete',
            method: 'post',
            params: { 
                bmdToken: bmdAuth?.bmdToken,
                authProviderId: bmdAuth?.authProviderId,
                paymentMethodId: data.paymentMethodId
            },
            callBackFunc: (requestData, json) => {

                const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: 'Payment method deleted.' });
                dispatch(queueAlert(newAlertObj));

                const callBackData = { ...data, ...json };
                dispatch(onDeletePaymentMethodReturn(callBackData));

            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onDeletePaymentMethodReturn(callBackData));
            }
        });
    };
};



export const onAddressDelete = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/address/destroy',
            method: 'post',
            params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId, addressId: data.addressId },
            callBackFunc: (requestData, json) => {

                const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: 'Address deleted.' });
                dispatch(queueAlert(newAlertObj));

                const callBackData = { ...data, ...json };
                dispatch(onAddressDeleteSuccess(callBackData));

            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onAddressDeleteFail(callBackData));
            }
        });
    };
};



export const saveAddress = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/address/save',
            method: 'post',
            params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId, ...data.address },
            callBackFunc: (requestData, json) => {

                const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: 'Address saved.' });
                dispatch(queueAlert(newAlertObj));

                const callBackData = { ...data, ...json };
                dispatch(onSaveAddressSuccess(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSaveAddressFail(callBackData));
            }
        });
    };
};



export const savePayment = (data) => {

    const bmdAuth = BmdAuth.getInstance();

    const url = (data.paymentFormCrudMethod == "create" ? "/stripePaymentMethod/save" : "/stripePaymentMethod/update");

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: url,
            method: "post",
            params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId, ...data.newPayment },
            callBackFunc: (requestData, json) => {

                if (json.isResultOk) {
                    const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: 'Payment-method saved.' });
                    dispatch(queueAlert(newAlertObj));
                }

                const callBackData = { ...data, ...json };
                dispatch(onSavePaymentSuccess(callBackData));
            },
            errorCallBackFunc: (errors, errorStatusCode) => {
                const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode };
                dispatch(onSavePaymentFail(callBackData));
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
                bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId,
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
            params: { bmdToken: bmdAuth?.bmdToken, authProviderId: bmdAuth?.authProviderId, },
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