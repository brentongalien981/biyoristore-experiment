import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";



/* NAMES */
export const SAVE_USER = "SAVE_USER";
export const ON_CREATE_ACCOUNT_SUCCESS = "ON_CREATE_ACCOUNT_SUCCESS";
export const ON_CREATE_ACCOUNT_FAIL = "ON_CREATE_ACCOUNT_FAIL";



/* FUNCS */
export const onCreateAccountSuccess = () => ({ type: ON_CREATE_ACCOUNT_SUCCESS });
export const onCreateAccountFail = (errors) => ({ type: ON_CREATE_ACCOUNT_FAIL });



/* AJAX FUNCS */
export const saveUser = (credentials) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: onCreateAccountSuccess()");
    Bs.log("credentials ==> ...");
    Bs.log(credentials);


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products/relatedProducts',
            // params: { errors: productId },
            neededResponseParams: ["errors"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/productInDetails.js, METHOD: readRelatedProducts() => ajaxCrud() => callBackFunc()");

                // if no error
                // dispatch(onCreateAccountSuccess());
                // else
                if (json.errors) {
                    dispatch(onCreateAccountFail(json.errors));
                }
            }
        });
    };
};