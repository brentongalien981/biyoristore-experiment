import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const ON_LOGIN_SUCCESS = "ON_LOGIN_SUCCESS";
export const ON_LOGIN_FAIL = "ON_LOGIN_FAIL";
export const RESET_FLAGS = "RESET_FLAGS";
export const ON_REDIRECT_HOME_SUCCESS = "ON_REDIRECT_HOME_SUCCESS";
export const RESET_ERRORS = "RESET_ERRORS";
export const SAVE_USER = "SAVE_USER";
export const ON_CREATE_ACCOUNT_SUCCESS = "ON_CREATE_ACCOUNT_SUCCESS";
export const ON_CREATE_ACCOUNT_FAIL = "ON_CREATE_ACCOUNT_FAIL";



/* FUNCS */
export const onLoginSuccess = (callBackData) => ({ type: ON_LOGIN_SUCCESS, callBackData: callBackData });
export const onLoginFail = (callBackData) => ({ type: ON_LOGIN_FAIL, callBackData: callBackData });
export const resetFlags = () => ({ type: RESET_FLAGS });
export const onRedirectHomeSuccess = () => ({ type: ON_REDIRECT_HOME_SUCCESS });
export const resetErrors = () => ({ type: RESET_ERRORS });
export const onCreateAccountSuccess = (returnData) => ({
    type: ON_CREATE_ACCOUNT_SUCCESS,
    returnData: returnData
});
export const onCreateAccountFail = (objs) => ({ type: ON_CREATE_ACCOUNT_FAIL, objs: objs });



/* AJAX FUNCS */
export const login = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/join/login',
            method: "post",
            params: { email: data.email, password: data.password, stayLoggedIn: data.stayLoggedIn, },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onLoginSuccess(callBackData));
            },
            errorCallBackFunc: (errors) => {
                const callBackData = { ...data, errors: errors };
                dispatch(onLoginFail(callBackData));

            },
        });
    };
};

export const saveUser = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/join/save',
            method: "post",
            params: { email: data.email, password: data.password },
            callBackFunc: (requestData, json) => {
                const returnData = { ...data, ...json };
                dispatch(onCreateAccountSuccess(returnData));
            },
            errorCallBackFunc: (errors) => {
                const objs = { ...data, errors: errors };
                dispatch(onCreateAccountFail(objs));

            },
        });
    };
};



export const verifyAuthData = (data) => {

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/join/verify',
            method: "post",
            params: { ...data },
            callBackFunc: (requestData, json) => {
                const returnData = { ...data, ...json };
                dispatch(onCreateAccountSuccess(returnData));
            },
            errorCallBackFunc: (errors) => {
                const objs = { ...data, errors: errors };
                dispatch(onCreateAccountFail(objs));
            },
        });
    };
};