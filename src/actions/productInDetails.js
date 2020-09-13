import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";



/* NAMES */
export const RELAUNCH_VENDOR_SCRIPT = "RELAUNCH_VENDOR_SCRIPT";
export const SHOW_PRODUCT = "SHOW_PRODUCT";



/* FUNCS */
export const relaunchVendorScript = () => ({
    type: RELAUNCH_VENDOR_SCRIPT
});

export const showProduct = (product) => ({
    type: SHOW_PRODUCT,
    product: product
});



/* AJAX FUNCS */
export const readProduct = (productId) => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products/show',
            params: { productId: productId },
            neededResponseParams: ["product"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/productInDetails.js, METHOD: readProduct() => ajaxCrud() => callBackFunc()");

                dispatch(showProduct(json.product));
            }
        });
    };
};