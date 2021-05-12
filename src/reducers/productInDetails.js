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
    shouldRelaunchVendorScript: false, // BMD-SENSITIVE-INFO: This is the workaround I made to refresh the bought-frontend-framework.
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
        case actions.ON_SAVE_REVIEW_RETURN: return onSaveReviewReturn(state, action);
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
const onSaveReviewReturn = (state, action) => {

    let returnState = {
        ...state,
    };

    if (!action.objs?.isResultOk) {
        alert("Oops! Something went wrong on our end. Please try again.");
    }


    action.objs.doPostProcessCallback();

    return returnState;

};



const endReadReviewsProcess = (state, action) => ({
    ...state,
    shouldDoPostReadReviewsProcess: false
});



const onReadReviewsOk = (state, action) => {

    let returnState = {
        ...state,
        shouldDoInitialReadReviews: false,
        shouldDoPostReadReviewsProcess: true
    };


    if (action.objs.isResultOk) {

        const requestUrlQ = action.objs.requestUrlQ;
        const productRatingUrlQ = 'product-rating?productId=' + action.objs.productId;
        let reviewsForCurrentBatchNum = [];

        if (action.objs.retrievedDataFrom === "cache" || action.objs.retrievedDataFrom === "db") {

            reviewsForCurrentBatchNum = action.objs.reviews;
            BsJLS.set(requestUrlQ, reviewsForCurrentBatchNum);            


            if (action.objs.batchNum == 1) {                
                const avgRating = action.objs.avgRating;
                BsJLS.set(productRatingUrlQ, avgRating);
            }
        }


        const previousReviews = action.objs.batchNum === 1 ? [] : [...state.reviews];
        reviewsForCurrentBatchNum = BsJLS.get(requestUrlQ) ?? [];

        const updatedReviews = [...previousReviews, ...reviewsForCurrentBatchNum];
        const avgRating = BsJLS.get(productRatingUrlQ);


        return {
            ...returnState,
            reviews: updatedReviews,
            avgRating: avgRating,
        };
    }



    return returnState;

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