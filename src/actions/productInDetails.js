import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";



/* NAMES */
export const XXX = "XXX";



/* FUNCS */
export const xxx = (objs) => ({
    type: XXX,
    objs: objs
});



/* AJAX FUNCS */
export const zzz = () => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/categories',
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/products.js, METHOD: readCategories() => ajaxCrud() => callBackFunc()");

                // dispatch(displayCategories(json.objs));
            }
        });
    };
};