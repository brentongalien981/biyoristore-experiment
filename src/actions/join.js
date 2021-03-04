import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const ON_REDIRECT_HOME_SUCCESS = "ON_REDIRECT_HOME_SUCCESS";
export const RESET_ERRORS = "RESET_ERRORS";
export const SAVE_USER = "SAVE_USER";
export const ON_CREATE_ACCOUNT_SUCCESS = "ON_CREATE_ACCOUNT_SUCCESS";
export const ON_CREATE_ACCOUNT_FAIL = "ON_CREATE_ACCOUNT_FAIL";



/* FUNCS */
export const onRedirectHomeSuccess = () => ({ type: ON_REDIRECT_HOME_SUCCESS });
export const resetErrors = () => ({ type: RESET_ERRORS });
export const onCreateAccountSuccess = (returndData) => ({
    type: ON_CREATE_ACCOUNT_SUCCESS,
    returndData: returndData
});
export const onCreateAccountFail = (objs) => ({ type: ON_CREATE_ACCOUNT_FAIL, objs: objs });



/* AJAX FUNCS */
export const login = (credentials) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: login()");


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/join/login',
            method: "post",
            params: { email: credentials.email, password: credentials.password },
            neededResponseParams: ["errors", "userId", "email", "apiToken", "doesPasswordMatch"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: login() => ajaxCrud() => callBackFunc()");

                if (json.errors) {
                    dispatch(onCreateAccountFail(json.errors));
                } else if (!json.doesPasswordMatch) {

                    const errors = { password: ["Invalid password"] };
                    dispatch(onCreateAccountFail(errors));
                }
                else {
                    dispatch(onCreateAccountSuccess(json));
                }
            }
        });
    };
};

export const saveUser = (data) => {

    //ish
    // TODO: User BsJLS.
    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/join/save',
            method: "post",
            params: { email: data.email, password: data.password },
            callBackFunc: (requestData, json) => {
                // TODO: Update BsJLS.
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