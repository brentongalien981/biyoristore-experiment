import * as productsActions from '../actions/products';
import Bs from '../bs-library/helpers/Bs';
import BsJLS from '../bs-library/helpers/BsJLS';


/** PROPERTIES */
const DEFAULT_CATEGORY = { id: 0, name: "All Products" };

const initialState = {
    message: "This is the initial state of products-store.",
    paginationData: { currentPageNum: 1 },
    shouldRefreshProducts: false,
    // brands: [{ id: 1, name: "Nike" }, { id: 2, name: "Adidas", isSelected: false }, { id: 3, name: "Toyota", isSelected: true }],
    brands: [],
    selectedCategory: {},
    currentPageNum: 1,
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
        //ish
        case productsActions.ON_URL_CHANGED: return onUrlChanged(state, action);
        case productsActions.ON_READ_PRODUCTS_OK: return onReadProductsOk(state, action);
        case productsActions.ON_READ_FILTERS_OK: return onReadFiltersOk(state, action);
        case productsActions.ON_BRAND_FILTER_CHANGED: return onBrandFilterChanged(state, action);
        //TODO:DELETE
        case productsActions.SET_SELECTED_CATEGORY: return setSelectedCategory(state, action);
        case productsActions.ON_CATEGORY_FILTER_CHANGED: return onCategoryFilterChanged(state, action);

        case productsActions.ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER: return onProductClickedViaListingReducer(state, action);
        case productsActions.ON_PRODUCT_LIKED: return onProductLiked(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */
const markSelectedBrands = (brandsToBeMarked, newlySelectedBrandIds) => {

    brandsToBeMarked.forEach(b => {
        if (newlySelectedBrandIds?.includes(b.id)) {
            b.isSelected = true;
        } else {
            b.isSelected = false;
        }
    });

    return brandsToBeMarked;
};



const getSelectedCategory = (state, categoryId) => {

    let category = {...DEFAULT_CATEGORY};
    const categories = state.categories;

    for (const c of categories) {

        if (c.id === parseInt(categoryId)) {
            category = c;
            break;
        }
    }

    return category;
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

const onUrlChanged = (state, action) => {

    return {
        ...state,
        shouldRefreshProducts: true,
    };
};



// TODO:DELETE
const setSelectedCategory = (state, action) => {

    const i = action.categoryFilterIndex;
    const updatedSelectedCategory = state.categories[i];

    return {
        ...state,
        selectedCategory: updatedSelectedCategory,
        shouldRefreshProducts: true,
        // TODO:DELETE
        // currentPageNum: 1,
    };
};

// TODO:DELETE
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

// TODO:DELETE
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



/* AJAX */
const onReadProductsOk = (state, action) => {

    const completeUrlQuery = action.objs.completeUrlQuery;
    if (action.objs.retrievedDataFrom === "cache" || action.objs.retrievedDataFrom === "db") {

        const productListingData = {
            products: action.objs.products,
            paginationData: action.objs.paginationData
        };

        BsJLS.set(completeUrlQuery, productListingData);
    }


    const newlySelectedBrandIds = action.objs.brands;
    const updatedBrands = markSelectedBrands(state.brands, newlySelectedBrandIds);    
    

    return {
        ...state,
        //ish
        brands: updatedBrands,
        selectedCategory: getSelectedCategory(state, action.objs.category),
        products: BsJLS.get(completeUrlQuery)?.products ?? [],
        paginationData: BsJLS.get(completeUrlQuery)?.paginationData ?? {},
        shouldRefreshProducts: false
    };
};



const onReadFiltersOk = (state, action) => {

    if (action.objs.retrievedDataFrom === "cache" || action.objs.retrievedDataFrom === "db") {
        BsJLS.set("products.brands", action.objs.brands);
        BsJLS.set("products.categories", action.objs.categories);
    }


    //
    const categoryForAllItems = { id: 0, name: "All Products" };
    let categories = [categoryForAllItems, ...BsJLS.get("products.categories")];

    const brands = BsJLS.get("products.brands") ?? [];


    return {
        ...state,
        brands:  brands,
        categories: categories
    };
};


export default products;