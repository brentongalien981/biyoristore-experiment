import React from 'react';
import Breadcrumbs from '../../theme-components/Breadcrumbs';
import FilterByCategories from './FilterByCategories';
import FilterByBrand from './FilterByBrand';
import FilterBySize from './FilterBySize';
import FilterByColor from './FilterByColor';
import FilterByPrice from './FilterByPrice';
import ListingHeader from './ListingHeader';
import Product from './Product';
import Pagination from './Pagination';
import './Listing.css';
import { connect } from 'react-redux';
import Bs from '../../bs-library/helpers/Bs';
import * as productsActions from '../../actions/products';
import { withRouter } from 'react-router-dom';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import { onAddToCart } from '../../actions/cart';



class Listing extends React.Component {

    /** PROPERTIES */
    state = {
        shouldRefreshProducts: false,
        selectedCategoryIndex: 0
    }



    /* HELPER FUNCS */
    changeUrl(params) {
        const urlQuery = this.buildNewUrlQuery(params);
        const url = "/products" + urlQuery;
        this.props.history.push(url);
        //ish
        this.props.onUrlChanged();
    }



    buildNewUrlQuery(params) {

        // Default params values.
        params = {
            pageNumber: params.pageNumber ?? 1,
            categoryId: params.categoryId ?? 0,
            brandIdToChange: params.brandIdToChange
        };


        let urlQuery = "";
        let queryParams = [];

        if (params.pageNumber !== 1) { queryParams.push({ name: "page", val: params.pageNumber }); }
        if (params.categoryId !== 0) { queryParams.push({ name: "category", val: params.categoryId }); }


        let updatedSelectedBrandIds = [];
        const previouslySelectedBrandIds = this.getSelectedBrandIds();
        if (params.brandIdToChange) {

            // Set the new updatedSelectedBrandIds.
            let didTheUserSelectBrandId = true;

            for (const id of previouslySelectedBrandIds) {
                // This means the brandId was unchecked, so don't include it to the updatedSelectedBrandIds.
                if (id === params.brandIdToChange) {
                    didTheUserSelectBrandId = false;
                    continue;
                }
                updatedSelectedBrandIds.push(id);
            }

            if (didTheUserSelectBrandId) {
                updatedSelectedBrandIds.push(params.brandIdToChange);
            }
        }
        else {
            updatedSelectedBrandIds = previouslySelectedBrandIds;
        }

        if (updatedSelectedBrandIds.length > 0) { 
            updatedSelectedBrandIds.sort();
            queryParams.push({ name: "brands", val: updatedSelectedBrandIds.toString() }); 
        }
        //ish


        let i = 0;
        queryParams.forEach(qp => {
            if (i === 0) {
                urlQuery += "?" + qp.name + "=" + qp.val;
            } else {
                urlQuery += "&" + qp.name + "=" + qp.val;
            }
            ++i;
        });


        return urlQuery;
    }



    buildCleanUrlQuery(cleanParams) {
        let urlQuery = "";

        let i = 0;
        for (const key in cleanParams) {
            let val = cleanParams[key];
            val = (Array.isArray(val) ? val.toString() : val);

            if (i === 0) {
                urlQuery += "?" + key + "=" + val;
            } else {
                urlQuery += "&" + key + "=" + val;
            }
            ++i;
        }

        return urlQuery;
    }



    /* MAIN FUNCS */
    componentDidMount() {
        this.props.readFilters();
        this.refreshProducts();
    }



    componentDidUpdate() {
        // TODO:DELETE
        // Bs.log("componentDidUpdate()");

        if (this.props.shouldRefreshProducts) {
            this.refreshProducts();
        }
    }



    refreshProducts() {
        const urlParams = this.props.location.search;
        const acceptedParams = ["page", "search", "brands", "category"];
        const parsedCleanUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);

        // Further clean param "page".
        let pageNumber = 1;
        if (parsedCleanUrlParams["page"] && parseInt(parsedCleanUrlParams["page"])) {
            pageNumber = parseInt(parsedCleanUrlParams["page"]);
        }


        // Further clean param "category".
        let categoryId = null;
        if (parsedCleanUrlParams["category"] && parseInt(parsedCleanUrlParams["category"])) {
            categoryId = parseInt(parsedCleanUrlParams["category"]);
        }


        // Further clean param "brands".
        let newlySelectedBrandIds = [];
        if (parsedCleanUrlParams["brands"] && parsedCleanUrlParams["brands"] !== "") {
            newlySelectedBrandIds = parsedCleanUrlParams["brands"].split(",");
            let tempIds = [];
            for (const id of newlySelectedBrandIds) {
                if (parseInt(id)) {
                    tempIds.push(parseInt(id));
                }
            }
            newlySelectedBrandIds = tempIds;
            newlySelectedBrandIds.sort();
        }


        // Finalize the url-params.
        let finalizedUrlParams = { page: pageNumber };
        if (categoryId) { finalizedUrlParams.category = categoryId; }
        if (newlySelectedBrandIds.length > 0) { finalizedUrlParams.brands = newlySelectedBrandIds; }


        let completeUrlQuery = this.buildCleanUrlQuery(finalizedUrlParams);
        completeUrlQuery = (completeUrlQuery == "" ? "all-products" : completeUrlQuery);


        const readParams = { ...finalizedUrlParams, completeUrlQuery: completeUrlQuery };

        // TODO:DELETE
        Bs.log("readParams ==> ...");
        Bs.log(readParams);

        this.props.readProducts(readParams);
        //ish
        
    }



    getSelectedBrandIds() {
        let selectedBrandIds = [];

        this.props.brands.forEach(b => {
            if (b.isSelected) { selectedBrandIds.push(b.id); }
        });

        return selectedBrandIds;
    }



    checkHasPageNumberChanged() {
        Bs.log("\n####################");
        Bs.log("CLASS:: Listing, METHOD:: checkHasPageNumberChanged()");

        const previousPageNum = this.props.paginationData.currentPageNum;

        const acceptedParams = ["page", "search"];
        const urlQuery = this.props.location.search;
        const parsedQueryParams = Bs.getParsedQueryParams(urlQuery, acceptedParams);
        const newPageNum = parsedQueryParams["page"] ? parsedQueryParams["page"] : 1;

        Bs.log("####################");
        Bs.log("previousPageNum ==> " + previousPageNum);
        Bs.log("newPageNum ==> " + newPageNum);

        if (previousPageNum != newPageNum) {
            // this.props.readProducts(parsedQueryParams);
            this.refreshProducts();
        }
    }


    /** EVENT FUNCS */
    onBrandFilterChanged = (brandFilterEventData) => {
        // Set the new url.
        const params = { brandIdToChange: brandFilterEventData.brandId };
        this.changeUrl(params);
        //ish
    };



    onCategoryClicked = (e, categoryFilterIndex, categoryId) => {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.selectedCategory.id == categoryId) { return; }

        // Set the new url.
        const params = { categoryId: categoryId };
        this.changeUrl(params);

    };



    onAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        Bs.log("\n####################");
        Bs.log("CLASS:: Listing, METHOD:: onAddToCart()");

        this.props.onAddToCart(product);

    };



    render() {

        const products = this.props.products.map((p, i) => {
            return (
                <div className="col-6 col-md-4" key={i}>
                    <Product
                        product={p}
                        onAddToCart={this.onAddToCart}
                        onProductClicked={this.props.onProductClickedViaListingReducer} />
                </div>
            );
        });

        return (
            <>
                <section className="Listing">
                    <div className="container">

                        <ListingHeader category={this.props.selectedCategory} />

                        <div className="row gutter-4">

                            {/* sidebar */}
                            <aside className="col-lg-3 sidebar">
                                <FilterByCategories categories={this.props.categories} onCategoryClicked={this.onCategoryClicked} />
                                <FilterByBrand brands={this.props.brands} onBrandFilterChanged={this.onBrandFilterChanged} />
                                <FilterByColor />
                                <FilterByPrice />
                            </aside>

                            {/* content */}
                            <div className="col-lg-9">
                                <div className="row gutter-2 gutter-lg-3">{products}</div>
                                <Pagination {...this.props.paginationData} />
                            </div>

                        </div>
                    </div>
                </section>
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        message: state.products.message,
        shouldRefreshProducts: state.products.shouldRefreshProducts,
        currentPageNum: state.products.currentPageNum,
        brands: state.products.brands,
        selectedCategory: state.products.selectedCategory,
        categories: state.products.categories,
        products: state.products.products,
        paginationData: state.products.paginationData
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        onUrlChanged: () => dispatch(productsActions.onUrlChanged()),
        onAddToCart: (product) => dispatch(onAddToCart(product)),
        readProducts: (params) => dispatch(productsActions.readProducts(params)),
        readFilters: () => dispatch(productsActions.readFilters()),

        //TODO:DELETE
        onBrandFilterChanged: (brandFilterEventData) => dispatch(productsActions.onBrandFilterChanged(brandFilterEventData)),
        onCategoryClicked: (categoryFilterEventData) => dispatch(productsActions.onCategoryFilterChanged(categoryFilterEventData)),

        setSelectedCategory: (categoryFilterIndex) => dispatch(productsActions.setSelectedCategory(categoryFilterIndex)),
        onProductClickedViaListingReducer: (e, props, product) => dispatch(productsActions.onProductClickedViaListingReducer(e, props, product))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listing));