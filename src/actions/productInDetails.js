import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";



/* NAMES */
export const ON_PRODUCT_CLICKED = "ON_PRODUCT_CLICKED";
export const SHOW_RELATED_PRODUCTS = "SHOW_RELATED_PRODUCTS";
export const RELAUNCH_VENDOR_SCRIPT = "RELAUNCH_VENDOR_SCRIPT";
export const SHOW_PRODUCT = "SHOW_PRODUCT";



/* FUNCS */
export const onProductClicked = (props, product) => {
    return { type: ON_PRODUCT_CLICKED, props: props, product: product };
};

export const showRelatedProducts = (objs) => ({
    type: SHOW_RELATED_PRODUCTS,
    objs: objs
});

export const relaunchVendorScript = () => ({
    type: RELAUNCH_VENDOR_SCRIPT
});

export const showProduct = (obj) => ({
    type: SHOW_PRODUCT,
    obj: obj
});



/* AJAX FUNCS */
export const readRelatedProducts = (productId) => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products/relatedProducts',
            params: { productId: productId },
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/productInDetails.js, METHOD: readRelatedProducts() => ajaxCrud() => callBackFunc()");

                dispatch(showRelatedProducts(json.objs));
            }
        });
    };
};

export const readProduct = (productId) => {
    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/products/show',
            params: { productId: productId },
            neededResponseParams: ["product", "relatedProducts"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/productInDetails.js, METHOD: readProduct() => ajaxCrud() => callBackFunc()");

                const obj = { product: json.product, relatedProducts: json.relatedProducts };
                dispatch(showProduct(obj));
            }
        });
    };
};