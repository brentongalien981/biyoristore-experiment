import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";



/* NAMES */
export const ON_REDIRECT_HOME_SUCCESS = "ON_REDIRECT_HOME_SUCCESS";
export const RESET_ERRORS = "RESET_ERRORS";
export const SAVE_USER = "SAVE_USER";
export const ON_CREATE_ACCOUNT_SUCCESS = "ON_CREATE_ACCOUNT_SUCCESS";
export const ON_CREATE_ACCOUNT_FAIL = "ON_CREATE_ACCOUNT_FAIL";



/* FUNCS */
export const onRedirectHomeSuccess = () => ({ type: ON_REDIRECT_HOME_SUCCESS });
export const resetErrors = () => ({ type: RESET_ERRORS });
export const onCreateAccountSuccess = (json) => ({
    type: ON_CREATE_ACCOUNT_SUCCESS,
    json: json
});
export const onCreateAccountFail = (errors) => ({ type: ON_CREATE_ACCOUNT_FAIL, errors: errors });



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

export const saveUser = (credentials) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: saveUser()");
    Bs.log("credentials ==> ...");
    Bs.log(credentials);


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/join/save',
            method: "post",
            params: { email: credentials.email, password: credentials.password },
            neededResponseParams: ["errors", "userId", "email", "apiToken"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: saveUser() => ajaxCrud() => callBackFunc()");

                if (json.errors) {
                    dispatch(onCreateAccountFail(json.errors));
                } else {
                    dispatch(onCreateAccountSuccess(json));
                }
            }
        });
    };
};