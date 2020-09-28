import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";



/* NAMES */
export const ON_PAYMENT_FORM_RESET_SUCCESS = "ON_PAYMENT_FORM_RESET_SUCCESS";
export const ON_SAVE_PAYMENT_FAIL = "ON_SAVE_PAYMENT_FAIL";
export const ON_SAVE_PAYMENT_SUCCESS = "ON_SAVE_PAYMENT_SUCCESS";
export const ON_SAVE_PROFILE_FAIL = "ON_SAVE_PROFILE_FAIL";
export const ON_SAVE_PROFILE_SUCCESS = "ON_SAVE_PROFILE_SUCCESS";
export const ON_PROFILE_DISPLAYED_SUCCESS = "ON_PROFILE_DISPLAYED_SUCCESS";
export const SET_PROFILE = "SET_PROFILE";



/* FUNCS */
export const onPaymentFormResetSuccess = () => ({ type: ON_PAYMENT_FORM_RESET_SUCCESS });
export const onSavePaymentFail = (errors) => ({ type: ON_SAVE_PAYMENT_FAIL, errors: errors });
export const onSavePaymentSuccess = (newPayment, paymentForCrudMethod) => ({ type: ON_SAVE_PAYMENT_SUCCESS, newPayment: newPayment, paymentForCrudMethod: paymentForCrudMethod });
export const onSaveProfileFail = (errors) => ({ type: ON_SAVE_PROFILE_FAIL, errors: errors });
export const onSaveProfileSuccess = (profile) => ({ type: ON_SAVE_PROFILE_SUCCESS, profile: profile });
export const onProfileDisplayedSuccess = () => ({ type: ON_PROFILE_DISPLAYED_SUCCESS });
export const setProfile = (profile, paymentInfos, addresses) => ({ type: SET_PROFILE, profile: profile, paymentInfos: paymentInfos, addresses: addresses });



/* AJAX FUNCS */
export const savePayment = (newPayment, paymentForCrudMethod) => {

    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/paymentInfo/save',
            method: "post",
            params: { ...newPayment, api_token: BsAppSession.get("apiToken") },
            neededResponseParams: ["newPayment"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: savePayment() => ajaxCrud() => callBackFunc()");

                if (json.isResultOk) {
                    dispatch(onSavePaymentSuccess(json.newPayment, paymentForCrudMethod));
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

export const readProfile = (userId) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: readProfile()");

    Bs.log("apiToken ==> " + BsAppSession.get("apiToken"));


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/profile/show',
            params: { userId: userId, api_token: BsAppSession.get("apiToken") },
            neededResponseParams: ["profile", "paymentInfos", "addresses"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: readProfile() => ajaxCrud() => callBackFunc()");

                dispatch(setProfile(json.profile, json.paymentInfos, json.addresses));
                
            }
        });
    };
};