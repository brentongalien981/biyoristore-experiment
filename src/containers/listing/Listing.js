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



class Listing extends React.Component {

    componentDidMount() {
        Bs.log("\n####################");
        Bs.log("CLASS:: Listing, METHOD:: componentDidMount()");

        this.props.readBrands();
        this.props.readCategories();

        const acceptedParams = ["page", "search"];
        const parsedQueryParams = Bs.getParsedQueryParams(this.props.location.search, acceptedParams);

        Bs.log("\n###################");
        Bs.log("parsedQueryParams ==> ...");
        Bs.log(parsedQueryParams);
        this.props.readProducts(parsedQueryParams);
    }



    componentDidUpdate() {
        Bs.log("\n####################");
        Bs.log("CLASS:: Listing, METHOD:: componentDidUpdate()");

        Bs.log("this.props ==> ...");
        Bs.log(this.props);

        this.checkHasPageNumberChanged();

        if (this.props.shouldRefreshProducts) {
            this.refreshProducts();
        }
    }



    refreshProducts() {
        const urlParams = this.props.location.search;
        const acceptedParams = ["page", "search"];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);

        const selectedBrandIds = this.getSelectedBrandIds();
        const readParams = { ...parsedUrlParams, selectedBrandIds: selectedBrandIds, selectedCategoryId: this.props.selectedCategory?.id };
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



    render() {

        const products = this.props.products.map((p, i) => {
            return (
                <div className="col-6 col-md-4" key={i}>
                    <Product product={p} onProductClicked={this.props.onProductClickedViaListingReducer} />
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
                                <FilterByCategories categories={this.props.categories} onCategoryClicked={this.props.onCategoryClicked} />
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
        brands: state.products.brands,
        selectedCategory: state.products.selectedCategory,
        categories: state.products.categories,
        products: state.products.products,
        paginationData: state.products.paginationData
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProducts: (params) => dispatch(productsActions.readProducts(params)),
        readBrands: () => dispatch(productsActions.readBrands()),
        readCategories: () => dispatch(productsActions.readCategories()),
        onBrandFilterChanged: (brandFilterEventData) => dispatch(productsActions.onBrandFilterChanged(brandFilterEventData)),
        onCategoryClicked: (categoryFilterEventData) => dispatch(productsActions.onCategoryFilterChanged(categoryFilterEventData)),
        onProductClickedViaListingReducer: (e, props, product) => dispatch(productsActions.onProductClickedViaListingReducer(e, props, product))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listing));