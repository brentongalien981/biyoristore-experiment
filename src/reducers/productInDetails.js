import * as actions from '../actions/productInDetails';
import Bs from '../bs-library/helpers/Bs';
// import { biyoristoreVendorLaunch } from '../bs-library/custom/crafty';
import $ from 'jquery';
import { setMostEfficientSellerForProduct, setMostEfficientSellerForProducts } from './products';
import BsJLS from '../bs-library/helpers/BsJLS';



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
    avgRating: null,
    reviews: [
        // { id: 1, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019" },
    ],
    // FLAGS
    shouldDoInitialReadReviews: false,
    shouldDoPostReadReviewsProcess: false,
};



/* REDUCER */
const productInDetails = (state = initialState, action) => {
    switch (action.type) {
        case actions.END_READ_REVIEWS_PROCESS: return endReadReviewsProcess(state, action);
        case actions.ON_READ_REVIEWS_OK: return onReadReviewsOk(state, action);
        case actions.SHOW_RELATED_PRODUCTS: return showRelatedProducts(state, action);
        case actions.SHOW_PRODUCT: return showProduct(state, action);
        case actions.RELAUNCH_VENDOR_SCRIPT: return relaunchVendorScript(state, action);
        case actions.RESET_PRODUCT: return resetProduct(state, action);
        default: return state;
    }
}



/* NORMAL */
const endReadReviewsProcess = (state, action) => ({
    ...state,
    shouldDoPostReadReviewsProcess: false
});



const onReadReviewsOk = (state, action) => {
    if (action.objs.isResultOk) {

        const updatedReviews = [...state.reviews, ...action.objs.reviews];
        const avgRating = action.objs.batchNum == 1 ? action.objs.avgRating : state.avgRating;

        return {
            ...state,
            shouldDoInitialReadReviews: false,
            reviews: updatedReviews,
            avgRating: avgRating,
            shouldDoPostReadReviewsProcess: true
        };
    }

    alert("Oops! Something went wrong on our end. Please try again.");

    return {
        ...state,
        shouldDoInitialReadReviews: false,
        shouldDoPostReadReviewsProcess: true
    };

};



const removeShownProductFromRelatedProducts = (productId, relatedProducts) => {
    let updatedRelatedProducts = [];

    for (const p of relatedProducts) {
        if (productId === p.id) { continue; }
        updatedRelatedProducts.push(p);
    }

    return updatedRelatedProducts;
};

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


    const requestUrlQ = action.objs.requestUrlQ;

    if (action.objs.retrievedDataFrom === "cache" || action.objs.retrievedDataFrom === "db") {

        const product = setMostEfficientSellerForProduct(action.objs.product);
        let relatedProducts = setMostEfficientSellerForProducts(action.objs.relatedProducts);
        relatedProducts = removeShownProductFromRelatedProducts(product.id, relatedProducts);

        const data = {
            product: product,
            relatedProducts: relatedProducts
        };

        BsJLS.set(requestUrlQ, data);
    }



    return {
        ...state,
        product: BsJLS.get(requestUrlQ)?.product ?? { ...defaultProduct },
        relatedProducts: BsJLS.get(requestUrlQ)?.relatedProducts ?? [],
        shouldResetProduct: false,
        shouldRelaunchVendorScript: true,
        shouldDoInitialReadReviews: true,
    };
};



export default productInDetails;