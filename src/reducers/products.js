import * as productsActions from '../actions/products';
import Bs from '../bs-library/helpers/Bs';



const initialState = {
    message: "This is the initial state of products-store.",
    paginationData: {},
    brands: [{ id: 1, name: "Nike" }, { id: 2, name: "Adidas" }],
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
        case productsActions.AJAX_READ_BRANDS: return ajaxReadBrands(state, action);
        default: return state;
    }
}



const readProducts = (state, action) => {
    return {
        ...state,
        message: "Just executed METHOD:: readProducts() from REDUCER:: products"
    };
};



/* AJAX */
const ajaxReadProducts = (state, action) => {
    return {
        ...state,
        products: action.objs,
        paginationData: action.paginationData,
        message: "Just executed METHOD: ajaxReadProducts() from REDUCER: products"
    };
};



const ajaxReadBrands = (state, action) => {
    Bs.log("\n###############");
    Bs.log("\nIn REDUCER: products, METHOD: ajaxReadBrands()");

    return {
        ...state,
        brands: action.objs,
        message: "Just executed METHOD:: ajaxReadBrands() from REDUCER:: products"
    };
};


export default products;