import Bs from "../bs-library/helpers/Bs";
import BsCore2 from "../bs-library/helpers/BsCore2";



/* NAMES */
export const ON_CHECK_BMD_AUTH_VALIDITY_FAIL = 'ON_CHECK_BMD_AUTH_VALIDITY_FAIL';



/* FUNCS */
export const onCheckBmdAuthValidityFail = (callBackData) => ({ type: ON_CHECK_BMD_AUTH_VALIDITY_FAIL, callBackData: callBackData });



/* AJAX FUNCS */
export const checkBmdAuthValidity = (data) => {


    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/bmd-auth/checkBmdAuthValidity',
            method: "post",
            params: {
                bmdToken: data.bmdToken,
                authProviderId: data.authProviderId,
            },
            callBackFunc: (requestData, json) => {
                // const callBackData = { ...data, ...json };
                // dispatch(onLoginSuccess(callBackData));
            },
            errorCallBackFunc: (errors) => {
                const callBackData = { ...data, errors: errors };
                dispatch(onCheckBmdAuthValidityFail(callBackData));

            },
        });
    };
};