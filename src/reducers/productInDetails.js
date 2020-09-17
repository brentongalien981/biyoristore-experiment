import * as actions from '../actions/productInDetails';
import Bs from '../bs-library/helpers/Bs';
// import { biyoristoreVendorLaunch } from '../bs-library/custom/crafty';
import $ from 'jquery';



/** */
const defaultProductReviewMsg = "lorem ipsum";
const defaultProduct = {
    id: 0,
    name: "",
    productPhotoUrls: [
        { id: 1, url: "default-product1.jpg" }
    ]
};

const initialState = {
    breadCrumbLinks: [
        { name: "Home", url: "/" },
        { name: "Listing", url: "/products" },
        { name: "Product", url: "" }
    ],
    message: "This is the initial state of STORE: productInDetails.",
    shouldResetProduct: false,
    shouldRelaunchVendorScript: false,
    product: defaultProduct,
    relatedProducts: [],
    reviews: [
        { id: 1, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019" },
        { id: 2, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019" },
        { id: 3, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019" },
        { id: 4, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019" },
        { id: 5, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019" },
        { id: 6, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019" }
    ]
};



/* REDUCER */
const productInDetails = (state = initialState, action) => {
    switch (action.type) {
        case actions.SHOW_RELATED_PRODUCTS: return showRelatedProducts(state, action);
        case actions.SHOW_PRODUCT: return showProduct(state, action);
        case actions.RELAUNCH_VENDOR_SCRIPT: return relaunchVendorScript(state, action);
        case actions.RESET_PRODUCT: return resetProduct(state, action);
        default: return state;
    }
}



/* NORMAL */
const resetProduct = (state, action) => {
    return {
        ...state,
        shouldResetProduct: true,
        product: defaultProduct
    };
};

const showRelatedProducts = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: productInDetails, METHOD: showRelatedProducts()");

    return {
        ...state,
        relatedProducts: action.objs,
        message: "Just executed METHOD:: showRelatedProducts() from REDUCER:: productInDetails"
    };
};

const relaunchVendorScript = (state, action) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: productInDetails, METHOD: relaunchVendorScript()");

    $("#shouldRelaunchVendorScript").trigger("click");

    return {
        ...state,
        shouldRelaunchVendorScript: false
    };
};

const showProduct = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: productInDetails, METHOD: showProduct()");

    return {
        ...state,
        product: action.obj.product,
        relatedProducts: action.obj.relatedProducts,
        shouldResetProduct: false,
        shouldRelaunchVendorScript: true,
        message: "Just executed METHOD:: showProduct() from REDUCER:: productInDetails"
    };
};



export default productInDetails;