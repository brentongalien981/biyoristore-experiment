import * as productsActions from '../actions/products';



const initialState = {
    message: "This is the initial state of products-store.",
    paginationData: {},
    products: [
        // {
        //     name: "Fawn Wool / Natural Mammoth Chair",
        //     price: "2268",
        //     productPhotoUrls: [
        //         {url: "assets/images/iphone11.jpg"},
        //         {url: "assets/images/iphone11b.jpg"},
        //     ]
        // }
    ]
};



/* REDUCER */
const products = (state = initialState, action) => {
    switch (action.type) {
        case productsActions.READ_PRODUCTS: return readProducts(state, action);  
        case productsActions.AJAX_READ_PRODUCTS: return ajaxReadProducts(state, action);    
        default: return state;
    }
}



const readProducts = (state, action) => {
    return {
        ...state,
        message: "Just executed METHOD:: readProducts() from REDUCER:: products"
    };
};



const ajaxReadProducts = (state, action) => {
    return {
        ...state,
        products: action.objs,
        paginationData: action.paginationData,
        message: "Just executed METHOD: ajaxReadProducts() from REDUCER: products"
    };
};


export default products;