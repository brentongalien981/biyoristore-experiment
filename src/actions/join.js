import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";



/* NAMES */
export const ON_REGISTER = "ON_REGISTER";
export const ON_EMAIL_CHANGED_FOR_CREATE_ACCOUNT = "ON_EMAIL_CHANGED_FOR_CREATE_ACCOUNT";



/* FUNCS */
export const onRegister = () => ({ type: ON_REGISTER });
export const onEmailChangedForCreateAccount = () => ({ type: ON_EMAIL_CHANGED_FOR_CREATE_ACCOUNT });



/* AJAX FUNCS */
export const xxx = (productId) => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products/relatedProducts',
            params: { productId: productId },
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/productInDetails.js, METHOD: readRelatedProducts() => ajaxCrud() => callBackFunc()");

                // dispatch(showRelatedProducts(json.objs));
            }
        });
    };
};