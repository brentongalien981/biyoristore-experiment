import * as productsActions from '../actions/products';
import Bs from '../bs-library/helpers/Bs';



const initialState = {
    message: "This is the initial state of products-store.",
    paginationData: { currentPageNum: 1 },
    shouldRefreshProducts: false,
    brands: [{ id: 1, name: "Nike" }, { id: 2, name: "Adidas", isSelected: false }, { id: 3, name: "Toyota", isSelected: true }],
    selectedCategory: null,
    categories: [{ id: 1, name: "laptop" }, { id: 2, name: "phone" }, { id: 3, name: "tablet" }],
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
        case productsActions.ON_BRAND_FILTER_CHANGED: return onBrandFilterChanged(state, action);
        case productsActions.ON_CATEGORY_FILTER_CHANGED: return onCategoryFilterChanged(state, action);
        case productsActions.ON_PRODUCT_CLICKED: return onProductClicked(state, action);
        case productsActions.DISPLAY_CATEGORIES: return displayCategories(state, action);
        default: return state;
    }
}



/* NORMAL */
const displayCategories = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: displayCategories()");

    return {
        ...state,
        categories: action.objs,
        message: "Just executed METHOD:: displayCategories() from REDUCER:: products"
    };
};

const onProductClicked = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: onProductClicked()");
    Bs.log("action.productId ==> " + action.productId);

    return {
        ...state,
        message: "Just executed METHOD:: onProductClicked() from REDUCER:: products"
    };
};

const onCategoryFilterChanged = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: onCategoryFilterChanged()");
    Bs.log("action.categoryFilterEventData ==> ...");
    Bs.log(action.categoryFilterEventData);

    const i = action.categoryFilterEventData.categoryFilterIndex;
    let updatedSelectedCategory = state.categories[i];
    return {
        ...state,
        selectedCategory: updatedSelectedCategory,
        shouldRefreshProducts: true,
        message: "Just executed METHOD:: onCategoryFilterChanged() from REDUCER:: products"
    };
};

const onBrandFilterChanged = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: onBrandFilterChanged()");
    Bs.log("brandFilterEventData ==> ...");
    Bs.log(action.brandFilterEventData);

    const i = action.brandFilterEventData.brandFilterIndex;
    let updatedBrands = state.brands;
    let updatedBrandFilter = updatedBrands[i];
    updatedBrandFilter.isSelected = updatedBrandFilter.isSelected ? false : true;
    updatedBrands[i] = updatedBrandFilter;

    return {
        ...state,
        brands: updatedBrands,
        shouldRefreshProducts: true,
        message: "Just executed METHOD:: onBrandFilterChanged() from REDUCER:: products"
    };
};

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
        shouldRefreshProducts: false,
        paginationData: action.paginationData,
        message: "Just executed METHOD: ajaxReadProducts() from REDUCER: products"
    };
};



const ajaxReadBrands = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: ajaxReadBrands()");

    return {
        ...state,
        brands: action.objs,
        message: "Just executed METHOD:: ajaxReadBrands() from REDUCER:: products"
    };
};


export default products;