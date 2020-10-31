import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";



/* NAMES */
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
export const onAddressDeleteFail = () => ({ type: ON_ADDRESS_DELETE_FAIL });
export const onAddressDeleteSuccess = (addressId) => ({ type: ON_ADDRESS_DELETE_SUCCESS, addressId: addressId });
export const onAddressFormResetSuccess = () => ({ type: ON_ADDRESS_FORM_RESET_SUCCESS });
export const onSaveAddressFail = (errors) => ({ type: ON_SAVE_ADDRESS_FAIL, errors: errors });
export const onSaveAddressSuccess = (address, addressFormCrudMethod) => ({ type: ON_SAVE_ADDRESS_SUCCESS, address: address, addressFormCrudMethod: addressFormCrudMethod });
// export const onPaymentFormResetSuccess = () => ({ type: ON_PAYMENT_FORM_RESET_SUCCESS });
export const onSavePaymentFail = (errors) => ({ type: ON_SAVE_PAYMENT_FAIL, errors: errors });
export const onSavePaymentSuccess = (newPayment, paymentFormCrudMethod) => ({ type: ON_SAVE_PAYMENT_SUCCESS, newPayment: newPayment, paymentFormCrudMethod: paymentFormCrudMethod });
export const doPostSavePaymentFinalization = () => ({ type: DO_POST_SAVE_PAYMENT_FINALIZATION });

export const onSaveProfileFail = (errors) => ({ type: ON_SAVE_PROFILE_FAIL, errors: errors });
export const onSaveProfileSuccess = (profile) => ({ type: ON_SAVE_PROFILE_SUCCESS, profile: profile });
export const onProfileDisplayedSuccess = () => ({ type: ON_PROFILE_DISPLAYED_SUCCESS });
export const setProfile = (profile, paymentInfos, addresses) => ({ type: SET_PROFILE, profile: profile, paymentInfos: paymentInfos, addresses: addresses });



/* AJAX FUNCS */
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

    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/stripePaymentMethod/save',
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

export const saveProfile = (profile) => {

    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/profile/save',
            method: "post",
            params: { ...profile, api_token: BsAppSession.get("apiToken") },
            neededResponseParams: ["errors", "profile"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: saveProfile() => ajaxCrud() => callBackFunc()");

                if (!json.errors) {
                    dispatch(onSaveProfileSuccess(json.profile));
                }
            },
            errorCallBackFunc: (errors) => {
                dispatch(onSaveProfileFail(errors));
            }
        });
    };
};

export const readProfile = () => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: readProfile()");


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/profile/show',
            params: { api_token: BsAppSession.get("apiToken") },
            neededResponseParams: ["profile", "paymentInfos", "addresses"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: readProfile() => ajaxCrud() => callBackFunc()");

                dispatch(setProfile(json.profile, json.paymentInfos, json.addresses));
                
            }
        });
    };
};