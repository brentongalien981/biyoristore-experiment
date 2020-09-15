import * as actions from '../actions/productInDetails';
import Bs from '../bs-library/helpers/Bs';
// import { biyoristoreVendorLaunch } from '../bs-library/custom/crafty';
import $ from 'jquery';



/** */
const defaultProductReviewMsg = "lorem ipsum";
const defaultProduct = {
    id: 1,
    name: "test",
    productPhotoUrls: [
        { id: 1, url: "asus1.jpg" }
    ]
};

const initialState = {
    message: "This is the initial state of STORE: productInDetails.",
    shouldResetGallery: false,
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
        case actions.ON_PRODUCT_CLICKED: return onProductClicked(state, action);
        case actions.SHOW_RELATED_PRODUCTS: return showRelatedProducts(state, action);
        case actions.SHOW_PRODUCT: return showProduct(state, action);
        case actions.RELAUNCH_VENDOR_SCRIPT: return relaunchVendorScript(state, action);
        case "TEST_DELETE_PRODUCT": return testDeleteProduct(state, action);
        default: return state;
    }
}



/* NORMAL */
const testDeleteProduct = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: productInDetails, METHOD: testDeleteProduct()");


    return {
        ...state,
        // shouldResetGallery: true,
        shouldRelaunchVendorScript: true,
        product: defaultProduct
    };
};

const onProductClicked = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: productInDetails, METHOD: onProductClicked()");


    return {
        ...state,
        shouldRefreshProduct: true
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
        // shouldRefreshProduct: false,
        shouldRelaunchVendorScript: true,
        message: "Just executed METHOD:: showProduct() from REDUCER:: productInDetails"
    };
};



export default productInDetails;