import * as actions from '../actions/productInDetails';
import Bs from '../bs-library/helpers/Bs';
// import { biyoristoreVendorLaunch } from '../bs-library/custom/crafty';
import $ from 'jquery';



/** */
const defaultProductReviewMsg = "lorem ipsum";
const initialState = {
    message: "This is the initial state of STORE: productInDetails.",
    shouldRelaunchVendorScript: false,
    product: {},
    relatedProducts: [
        // {
        //     title: "Fawn Wool / Natural Mammoth Chair",
        //     price: "2268",
        //     productPhotoUrls: [
        //         "assets/images/iphone11.jpg",
        //         "assets/images/iphone11b.jpg"
        //     ]
        // }
    ],
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
        case actions.SHOW_PRODUCT: return showProduct(state, action);
        case actions.RELAUNCH_VENDOR_SCRIPT: return relaunchVendorScript(state, action);
        default: return state;
    }
}



/* NORMAL */
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
        product: action.product,
        shouldRelaunchVendorScript: true,
        message: "Just executed METHOD:: showProduct() from REDUCER:: productInDetails"
    };
};



export default productInDetails;