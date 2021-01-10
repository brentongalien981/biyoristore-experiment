import * as productsActions from '../actions/products';
import Bs from '../bs-library/helpers/Bs';
import BsJLS from '../bs-library/helpers/BsJLS';



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
        case productsActions.ON_READ_FILTERS_OK: return onReadFiltersOk(state, action);
        case productsActions.AJAX_READ_PRODUCTS: return ajaxReadProducts(state, action);
        case productsActions.AJAX_READ_BRANDS: return ajaxReadBrands(state, action);
        case productsActions.ON_BRAND_FILTER_CHANGED: return onBrandFilterChanged(state, action);
        case productsActions.ON_CATEGORY_FILTER_CHANGED: return onCategoryFilterChanged(state, action);
        case productsActions.ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER: return onProductClickedViaListingReducer(state, action);
        case productsActions.ON_PRODUCT_LIKED: return onProductLiked(state, action);
        case productsActions.DISPLAY_CATEGORIES: return displayCategories(state, action);
        default: return state;
    }
}



/* NORMAL */
const onProductLiked = (state, action) => {
    action.event.stopPropagation();

    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: onProductLiked()");

    return {
        ...state
    };
};

const displayCategories = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: displayCategories()");

    return {
        ...state,
        categories: action.objs,
        message: "Just executed METHOD:: displayCategories() from REDUCER:: products"
    };
};

const onProductClickedViaListingReducer = (state, action) => {
    Bs.log("\n###############");
    Bs.log("In REDUCER: products, METHOD: onProductClickedViaListingReducer()");
    Bs.log("action.props ==> ...");
    Bs.log(action.props);
    Bs.log("action.product ==> ...");
    Bs.log(action.product);

    action.e.preventDefault();
    action.e.stopPropagation();

    action.props.history.push("/product?productId=" + action.product.id);

    return {
        ...state,
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



const onReadFiltersOk = (state, action) => {

    if (action.objs.retrievedDataFrom === "cache" || action.objs.retrievedDataFrom === "db") {
        BsJLS.set("products.brands", action.objs.brands);
        BsJLS.set("products.categories", action.objs.categories);
    }

    return {
        ...state,
        brands: action.objs.brands,
        categories: action.objs.categories,
    };
};


export default products;