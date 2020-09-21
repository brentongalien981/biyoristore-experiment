import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";



/* NAMES */
export const RESET_ERRORS = "RESET_ERRORS";
export const SAVE_USER = "SAVE_USER";
export const ON_CREATE_ACCOUNT_SUCCESS = "ON_CREATE_ACCOUNT_SUCCESS";
export const ON_CREATE_ACCOUNT_FAIL = "ON_CREATE_ACCOUNT_FAIL";



/* FUNCS */
export const resetErrors = () => ({ type: RESET_ERRORS });
export const onCreateAccountSuccess = (email, apiToken) => ({ 
    type: ON_CREATE_ACCOUNT_SUCCESS,
    email: email,
    apiToken: apiToken
});
export const onCreateAccountFail = (errors) => ({ type: ON_CREATE_ACCOUNT_FAIL, errors: errors });



/* AJAX FUNCS */
export const saveUser = (credentials) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: onCreateAccountSuccess()");
    Bs.log("credentials ==> ...");
    Bs.log(credentials);


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/join/save',
            method: "post",
            params: { email: credentials.email, password: credentials.password },
            neededResponseParams: ["errors", "email", "apiToken"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: saveUser() => ajaxCrud() => callBackFunc()");

                if (json.errors) {
                    dispatch(onCreateAccountFail(json.errors));
                } else { 
                    dispatch(onCreateAccountSuccess(json.email, json.apiToken));
                }
            }
        });
    };
};