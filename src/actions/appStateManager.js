import BmdAuth from "../bs-library/core/BmdAuth";
import Bs from "../bs-library/helpers/Bs";
import BsCore2 from "../bs-library/helpers/BsCore2";
import BsJLS from "../bs-library/helpers/BsJLS";



/* NAMES */
export const ON_CHECK_BMD_AUTH_VALIDITY_OK = 'ON_CHECK_BMD_AUTH_VALIDITY_OK';
export const ON_CHECK_BMD_AUTH_VALIDITY_FAIL = 'ON_CHECK_BMD_AUTH_VALIDITY_FAIL';



/* FUNCS */
export const onCheckBmdAuthValidityOk = (callBackData) => ({ type: ON_CHECK_BMD_AUTH_VALIDITY_OK, callBackData: callBackData });
export const onCheckBmdAuthValidityFail = (callBackData) => ({ type: ON_CHECK_BMD_AUTH_VALIDITY_FAIL, callBackData: callBackData });



/* AJAX FUNCS */
export const checkBmdAuthValidity = (data) => {

    if (!BmdAuth.isLoggedIn()) { return onCheckBmdAuthValidityFail({ ...data }); }

    const bmdAuth = BmdAuth.getInstance();

    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/bmd-auth/checkBmdAuthValidity',
            method: "post",
            params: {
                bmdToken: bmdAuth.bmdToken,
                authProviderId: bmdAuth.authProviderId,
            },
            callBackFunc: (requestData, json) => {
                const callBackData = { ...data, ...json };
                dispatch(onCheckBmdAuthValidityOk(callBackData));
            },
            errorCallBackFunc: (errors) => {
                const callBackData = { ...data, errors: errors };
                dispatch(onCheckBmdAuthValidityFail(callBackData));

            },
        });
    };
};