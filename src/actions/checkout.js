import BsCore2 from "../bs-library/helpers/BsCore2";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";



/* NAMES */
// export const ON_ADDRESS_SELECTION_CHANGE = "ON_ADDRESS_SELECTION_CHANGE";
export const ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS = "ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS";


/* FUNCS */
// export const onAddressSelectionChange = (e, i) => ({ type: ON_ADDRESS_SELECTION_CHANGE, e: e, i: i });
export const onReadCheckoutRequiredDataSuccess = (objs) => ({ type: ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS, objs: objs });


/* AJAX FUNCS */
export const readCheckoutRequiredData = () => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: login()");


    return (dispatch) => {

        BsCore2.ajaxCrud({
            url: '/checkout/readCheckoutRequiredData',
            method: "post",
            params: { api_token: BsAppSession.get("apiToken") },
            callBackFunc: (requestData, json) => { 
                Bs.log("\n#####################");
                Bs.log("FILE: actions/checkout.js, METHOD: readCheckoutRequiredData() => ajaxCrud() => callBackFunc()");

                Bs.log("\njson.objs.addresses => ...");
                Bs.log(json.objs.addresses);

                dispatch(onReadCheckoutRequiredDataSuccess(json.objs));
            }
        });
    };
};