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

    /* HELPER FUNCS */
    getUpdatedUrl() {

        let url = "/products";
        let params = [];

        // page-number
        let pageNum = this.props.currentPageNum;
        if (pageNum !== 1) { params.push({ name: "page", val: pageNum }); }

        // category
        let categoryId = this.props.selectedCategory.id;
        if (categoryId && categoryId !== 0) { params.push({ name: "category", val: categoryId }); }

        // TODO: brand

        // 
        let i = 0;
        params.forEach(param => {
            if (i === 0) {
                url += "?" + param.name + "=" + param.val;
            } else {
                url += "&" + param.name + "=" + param.val;
            }
            ++i;
        });

        return url;
    }



    buildUrlQuery(readParams) {
        let urlQuery = "";

        let i = 0;
        for (const key in readParams) {
            const val = readParams[key];

            if (i === 0) {
                urlQuery += "?" + key + "=" + val;
            } else {
                urlQuery += "&" + key + "=" + val;
            }
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
        // this.checkHasPageNumberChanged();

        if (this.props.shouldRefreshProducts) {
            Bs.log("AFTER ==> " + this.props.selectedCategory.id);
            // ish
            // Set the new url.
            const url = this.getUpdatedUrl();
            this.props.history.push(url);
            // this.refreshProducts();
        }
    }



    refreshProducts() {
        const urlParams = this.props.location.search;
        const acceptedParams = ["page", "search", "brands", "category"];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);

        // TODO: Re-implement with the use of brands.
        // TODO: Re-implement with the use of teams.
        // const selectedBrandIds = this.getSelectedBrandIds();
        // let readParams = { ...parsedUrlParams, selectedBrandIds: selectedBrandIds };

        //ish
        let completeUrlQuery = this.buildUrlQuery(parsedUrlParams);
        completeUrlQuery = completeUrlQuery == "" ? "all-products" : completeUrlQuery;

        parsedUrlParams["page"] = parsedUrlParams["page"] ?? 1;
        
        const readParams = { ...parsedUrlParams, completeUrlQuery: completeUrlQuery };

        Bs.log("readParams ==> ...");
        Bs.log(readParams);
        this.props.readProducts(readParams);
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
    onCategoryClicked = (e, categoryFilterIndex, categoryId) => {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.selectedCategory.id == categoryId) { return; }

        this.props.setSelectedCategory(categoryFilterIndex);
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
                                <FilterByBrand brands={this.props.brands} onBrandFilterChanged={this.props.onBrandFilterChanged} />
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
        onAddToCart: (product) => dispatch(onAddToCart(product)),
        readProducts: (params) => dispatch(productsActions.readProducts(params)),
        readFilters: () => dispatch(productsActions.readFilters()),
        onBrandFilterChanged: (brandFilterEventData) => dispatch(productsActions.onBrandFilterChanged(brandFilterEventData)),
        //TODO:DELETE
        onCategoryClicked: (categoryFilterEventData) => dispatch(productsActions.onCategoryFilterChanged(categoryFilterEventData)),

        setSelectedCategory: (categoryFilterIndex) => dispatch(productsActions.setSelectedCategory(categoryFilterIndex)),
        onProductClickedViaListingReducer: (e, props, product) => dispatch(productsActions.onProductClickedViaListingReducer(e, props, product))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listing));