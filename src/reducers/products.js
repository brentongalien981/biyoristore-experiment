import * as productsActions from '../actions/products';
import Bs from '../bs-library/helpers/Bs';
import BsJLS from '../bs-library/helpers/BsJLS';
import { SORT_FILTER_CODES } from '../containers/listing/helpers/constants';


/** PROPERTIES */
const DEFAULT_CATEGORY = { id: 0, name: "All Products" };
const TEMPLATE_SELLER = { id: 0, name: "TEMPLATE_SELLER", productSeller: { sell_price: "999999.98", discount_sell_price: null } };

const initialState = {
    message: "This is the initial state of products-store.",
    paginationData: { currentPageNum: 1 },
    shouldRefreshProducts: false,
    // brands: [{ id: 1, name: "Nike" }, { id: 2, name: "Adidas", isSelected: false }, { id: 3, name: "Toyota", isSelected: true }],
    brands: [],
    teams: [],
    selectedCategory: {},
    sortFilterCode: SORT_FILTER_CODES.NAME_ASC,
    currentPageNum: 1,
    // categories: [{ id: 1, name: "laptop" }, { id: 2, name: "phone" }, { id: 3, name: "tablet" }],
    categories: [],
    products: [],
    // FLAGS
    shouldDoPostReadFiltersProcess: false,
    shouldDoPostRefreshProductsProcess: false
};



/* REDUCER */
const products = (state = initialState, action) => {
    switch (action.type) {
        case productsActions.END_REFRESH_PRODUCTS_PROCESS: return endRefreshProductsProcess(state, action);
        case productsActions.END_READ_FILTERS_PROCESS: return endReadFiltersProcess(state, action);
        case productsActions.ON_URL_CHANGED: return onUrlChanged(state, action);

        case productsActions.ON_READ_PRODUCTS_FAIL: return onReadProductsFail(state, action);
        case productsActions.ON_READ_PRODUCTS_OK: return onReadProductsOk(state, action);
        case productsActions.ON_READ_FILTERS_OK: return onReadFiltersOk(state, action);

        case productsActions.ON_PRODUCT_CLICKED_VIA_LISTING_REDUCER: return onProductClickedViaListingReducer(state, action);
        case productsActions.ON_PRODUCT_LIKED: return onProductLiked(state, action);
        default: return state;
    }
}



/** HELPER FUNCS */
const setMostEfficientSellerForProducts = (products) => {
    const updatedProducts = [];

    products.forEach(p => {
        const updatedProduct = p;
        let mostEfficientSeller = p.sellers?.[0] ?? {...TEMPLATE_SELLER};
        let productDisplayPrice = 999999.99;

        p.sellers.forEach(s => {
            const sellPrice = parseFloat(s.productSeller.sell_price);
            const discountSellPrice = parseFloat(s.productSeller.discount_sell_price);

            if (sellPrice < productDisplayPrice || discountSellPrice < productDisplayPrice) {
                mostEfficientSeller = s;
                productDisplayPrice = (discountSellPrice < sellPrice ? discountSellPrice : sellPrice);
                mostEfficientSeller.productSeller.display_price = productDisplayPrice;
            };
            
        });

        updatedProduct.mostEfficientSeller = mostEfficientSeller;
        updatedProducts.push(updatedProduct);
        //ish
    });

    return updatedProducts;
};


const endRefreshProductsProcess = (state, action) => {
    return {
        ...state,
        shouldDoPostRefreshProductsProcess: false
    };
};



const endReadFiltersProcess = (state, action) => {
    return {
        ...state,
        shouldDoPostReadFiltersProcess: false
    };
};



const markSelectedTeams = (teamsToBeMarked, newlySelectedTeamIds) => {

    teamsToBeMarked.forEach(t => {
        if (newlySelectedTeamIds?.includes(t.id)) {
            t.isSelected = true;
        } else {
            t.isSelected = false;
        }
    });

    return teamsToBeMarked;
};



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



const getSortFilterCode = (val) => {
    let setFilterCode = SORT_FILTER_CODES.NAME_ASC;

    for (const key in SORT_FILTER_CODES) {
        const obj = SORT_FILTER_CODES[key];
        if (obj.val === parseInt(val)) {
            setFilterCode = obj;
            break;
        }
    }

    return setFilterCode;
}



const getSelectedCategory = (state, categoryId) => {

    let category = { ...DEFAULT_CATEGORY };
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



/* AJAX */
const onReadProductsFail = (state, action) => {

    alert("Oops! Something went wrong on our end. Please try again later.");

    return {
        ...state
    };
};



const onReadProductsOk = (state, action) => {

    const completeUrlQuery = action.objs.completeUrlQuery;
    if (action.objs.retrievedDataFrom === "cache" || action.objs.retrievedDataFrom === "db") {

        const products = setMostEfficientSellerForProducts(action.objs.products);
        //ish

        const productListingData = {
            products: products,
            paginationData: action.objs.paginationData
        };

        BsJLS.set(completeUrlQuery, productListingData);
    }


    const newlySelectedBrandIds = action.objs.brands;
    const updatedBrands = markSelectedBrands(state.brands, newlySelectedBrandIds);

    const newlySelectedTeamIds = action.objs.teams;
    const updatedTeams = markSelectedTeams(state.teams, newlySelectedTeamIds);


    return {
        ...state,
        teams: updatedTeams,
        brands: updatedBrands,
        selectedCategory: getSelectedCategory(state, action.objs.category),
        sortFilterCode: getSortFilterCode(action.objs.sort),
        products: BsJLS.get(completeUrlQuery)?.products ?? [],
        paginationData: BsJLS.get(completeUrlQuery)?.paginationData ?? {},
        shouldRefreshProducts: false,
        shouldDoPostRefreshProductsProcess: true
    };
};



const onReadFiltersOk = (state, action) => {

    if (action.objs.retrievedDataFrom === "cache" || action.objs.retrievedDataFrom === "db") {
        BsJLS.set("products.brands", action.objs.brands);
        BsJLS.set("products.categories", action.objs.categories);
        BsJLS.set("products.teams", action.objs.teams);
    }


    //
    const categoryForAllItems = { id: 0, name: "All Products" };
    let categories = [categoryForAllItems, ...BsJLS.get("products.categories")];

    const brands = BsJLS.get("products.brands") ?? [];
    const teams = BsJLS.get("products.teams") ?? [];


    return {
        ...state,
        brands: brands,
        categories: categories,
        teams: teams,
        shouldDoPostReadFiltersProcess: true
    };
};


export default products;