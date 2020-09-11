import * as actions from '../actions/productInDetails';
import Bs from '../bs-library/helpers/Bs';



/** */
const defaultProductReviewMsg = "lorem ipsum";
const initialState = {
    message: "This is the initial state of STORE: productInDetails.",
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
        {id: 1, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019"},
        {id: 2, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019"},
        {id: 3, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019"},
        {id: 4, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019"},
        {id: 5, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019"},
        {id: 6, firstName: "Michael", lastName: "Doe", message: defaultProductReviewMsg, date: "Jul 5, 2019"}
    ]
};



/* REDUCER */
const productInDetails = (state = initialState, action) => {
    switch (action.type) {
        case actions.XXX: return xxx(state, action);
        default: return state;
    }
}



/* NORMAL */
const xxx = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: displayCategories()");

    return {
        ...state,
        message: "Just executed METHOD:: displayCategories() from REDUCER:: products"
    };
};



export default productInDetails;