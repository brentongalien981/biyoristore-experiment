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
import FilterByTeam from './FilterByTeam';
import { SORT_FILTER_CODES } from './helpers/constants';
import WaitLoader from '../../components/loader/WaitLoader';



class Listing extends React.Component {

    /** PROPERTIES */
    state = {
        isReadingFilter: false,
        isRefreshingProducts: false,
        isRefreshingProducts: false,
        // shouldRefreshProducts: false,
        selectedCategoryIndex: 0
    };



    /* HELPER FUNCS */
    getUpdatedSelectedTeamIds(teamIdToChange) {
        let updatedSelectedTeamIds = [];
        const previouslySelectedTeamIds = this.getSelectedTeamIds();

        if (teamIdToChange) {

            // Set the new updatedSelectedTeamIds.
            let didTheUserSelectTeamId = true;

            for (const id of previouslySelectedTeamIds) {
                // This means the brandId was unchecked, so don't include it to the updatedSelectedTeamIds.
                if (id === teamIdToChange) {
                    didTheUserSelectTeamId = false;
                    continue;
                }
                updatedSelectedTeamIds.push(id);
            }

            if (didTheUserSelectTeamId) {
                updatedSelectedTeamIds.push(teamIdToChange);
            }
        }
        else {
            updatedSelectedTeamIds = previouslySelectedTeamIds;
        }

        return updatedSelectedTeamIds.sort(Bs.compareNumberically);
    }



    getUpdatedSelectedBrandIds(brandIdToChange) {
        let updatedSelectedBrandIds = [];
        const previouslySelectedBrandIds = this.getSelectedBrandIds();
        if (brandIdToChange) {

            // Set the new updatedSelectedBrandIds.
            let didTheUserSelectBrandId = true;

            for (const id of previouslySelectedBrandIds) {
                // This means the brandId was unchecked, so don't include it to the updatedSelectedBrandIds.
                if (id === brandIdToChange) {
                    didTheUserSelectBrandId = false;
                    continue;
                }
                updatedSelectedBrandIds.push(id);
            }

            if (didTheUserSelectBrandId) {
                updatedSelectedBrandIds.push(brandIdToChange);
            }
        }
        else {
            updatedSelectedBrandIds = previouslySelectedBrandIds;
        }

        return updatedSelectedBrandIds.sort(Bs.compareNumberically);
    }



    doPreRefreshProductsProcess() {
        if (this.state.isRefreshingProducts) { 
            Bs.log('wait up');
            return false; 
        }
        this.setState({ isRefreshingProducts: true });
        return true;
    }



    doActualReadFiltersProcess() {
        this.props.readFilters();
    }



    doPreReadFiltersProcess() {
        if (this.state.isReadingFilter) { return false; }
        this.setState({ isReadingFilter: true });
        return true;
    }



    changeUrl(params) {
        const urlQuery = this.buildNewUrlQuery(params);
        const url = "/products" + urlQuery;
        this.props.history.push(url);
        this.props.onUrlChanged();
    }



    buildNewUrlQuery(params) {

        // Default params values.
        params = {
            pageNumber: params.pageNumber ?? 1,
            categoryId: params.categoryId ?? 0,
            brandIdToChange: params.brandIdToChange,
            teamIdToChange: params.teamIdToChange,
            sortFilterCode: params.sortFilterCode ?? SORT_FILTER_CODES.NAME_ASC
        };


        // Set params.
        let urlQuery = "";
        let queryParams = [];

        if (params.pageNumber !== 1) { queryParams.push({ name: "page", val: params.pageNumber }); }
        if (params.categoryId !== 0) { queryParams.push({ name: "category", val: params.categoryId }); }
        if (params.sortFilterCode.val !== 1) { queryParams.push({ name: "sort", val: params.sortFilterCode.val }); }

        let updatedSelectedBrandIds = this.getUpdatedSelectedBrandIds(params.brandIdToChange);
        if (updatedSelectedBrandIds.length > 0) {
            queryParams.push({ name: "brands", val: updatedSelectedBrandIds.toString() });
        }

        let updatedSelectedTeamIds = this.getUpdatedSelectedTeamIds(params.teamIdToChange);
        if (updatedSelectedTeamIds.length > 0) {
            queryParams.push({ name: "teams", val: updatedSelectedTeamIds.toString() });
        }



        // Build urlQuery.
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
        try {
            if (this.doPreReadFiltersProcess()) { this.doActualReadFiltersProcess(); }
            
            if (this.doPreRefreshProductsProcess()) { 
                this.doActualRefreshProductsProcess(); 
            }

        } catch (e) {
            Bs.log("error bruh ==> " + e);
        }

    }



    componentDidUpdate() {
        if (this.props.shouldDoPostReadFiltersProcess) {
            this.setState({ isReadingFilter: false });
            this.props.endReadFiltersProcess();
        }

        if (this.props.shouldRefreshProducts) {
            if (this.doPreRefreshProductsProcess()) { 
                this.doActualRefreshProductsProcess(); 
            }
        }

        if (this.props.shouldDoPostRefreshProductsProcess) {
            this.setState({ isRefreshingProducts: false });
            this.props.endRefreshProductsProcess();
        }
    }



    doActualRefreshProductsProcess() {
        const urlParams = this.props.location.search;
        const acceptedParams = ["page", "search", "brands", "category", "teams", "sort"];
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


        // Further clean param "sort".
        let sortVal = null;
        if (parsedCleanUrlParams["sort"] && parseInt(parsedCleanUrlParams["sort"])) {
            sortVal = parseInt(parsedCleanUrlParams["sort"]);
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
            newlySelectedBrandIds.sort(Bs.compareNumberically);
        }


        // Further clean param "teams".
        let newlySelectedTeamIds = [];
        if (parsedCleanUrlParams["teams"] && parsedCleanUrlParams["teams"] !== "") {
            newlySelectedTeamIds = parsedCleanUrlParams["teams"].split(",");
            let tempIds = [];
            for (const id of newlySelectedTeamIds) {
                if (parseInt(id)) {
                    tempIds.push(parseInt(id));
                }
            }
            newlySelectedTeamIds = tempIds;
            newlySelectedTeamIds.sort(Bs.compareNumberically);
        }


        // Finalize the url-params.
        let finalizedUrlParams = { page: pageNumber };
        if (categoryId) { finalizedUrlParams.category = categoryId; }
        if (sortVal) { finalizedUrlParams.sort = sortVal; }
        if (newlySelectedBrandIds.length > 0) { finalizedUrlParams.brands = newlySelectedBrandIds; }
        if (newlySelectedTeamIds.length > 0) { finalizedUrlParams.teams = newlySelectedTeamIds; }


        // Set urlQuery.
        let completeUrlQuery = this.buildCleanUrlQuery(finalizedUrlParams);
        completeUrlQuery = (completeUrlQuery == "" ? "all-products" : completeUrlQuery);


        const readParams = { ...finalizedUrlParams, completeUrlQuery: completeUrlQuery };
        this.props.readProducts(readParams);

    }



    getSelectedBrandIds() {
        let selectedBrandIds = [];

        this.props.brands.forEach(b => {
            if (b.isSelected) { selectedBrandIds.push(b.id); }
        });

        return selectedBrandIds;
    }



    getSelectedTeamIds() {
        let selectedTeamIds = [];

        this.props.teams.forEach(t => {
            if (t.isSelected) { selectedTeamIds.push(t.id); }
        });

        return selectedTeamIds;
    }



    /** EVENT FUNCS */
    onProductClicked = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.history.push('/product?productId=' + productId);
    };



    onSortFilterClick = (e, sortFilterCode) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.state.isReadingFilter) { return; }
        if (this.state.isRefreshingProducts) { return; }
        if (this.props.sortFilterCode.val == sortFilterCode.val) { return; }

        // Set the new url..
        const params = { categoryId: this.props.selectedCategory.id, sortFilterCode: sortFilterCode };
        this.changeUrl(params);
    };



    onTeamFilterChange = (teamId) => {
        if (this.state.isReadingFilter) { return; }
        if (this.state.isRefreshingProducts) { return; }

        // Set the new url.
        const params = {
            teamIdToChange: teamId,
            categoryId: this.props.selectedCategory.id,
            sortFilterCode: this.props.sortFilterCode
        };
        this.changeUrl(params);
    };



    onPageNumClick = (e, pageNum) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.state.isReadingFilter) { return; }
        if (this.state.isRefreshingProducts) { return; }
        if (this.props.paginationData.currentPageNum == pageNum) { return; }

        // Set the new url.
        const params = { pageNumber: pageNum, categoryId: this.props.selectedCategory.id, sortFilterCode: this.props.sortFilterCode };
        this.changeUrl(params);
    };



    onBrandFilterChanged = (brandFilterEventData) => {
        if (this.state.isReadingFilter) { return; }
        if (this.state.isRefreshingProducts) { return; }

        // Set the new url.
        const params = {
            brandIdToChange: brandFilterEventData.brandId,
            categoryId: this.props.selectedCategory.id,
            sortFilterCode: this.props.sortFilterCode
        };
        this.changeUrl(params);
    };



    onCategoryClicked = (e, categoryFilterIndex, categoryId) => {
        e.stopPropagation();
        e.preventDefault();

        if (this.state.isReadingFilter) { return; }
        if (this.state.isRefreshingProducts) { return; }
        if (this.props.selectedCategory.id == categoryId) { return; }

        // Set the new url.
        const params = { categoryId: categoryId, sortFilterCode: this.props.sortFilterCode };
        this.changeUrl(params);

    };



    render() {

        let products = this.props.products.map((p, i) => {
            return (
                <div className="col-6 col-md-4" key={i}>
                    <Product
                        product={p}
                        // onAddToCart={this.onAddToCart}
                        onProductClicked={this.onProductClicked} />
                </div>
            );
        });


        if (this.state.isRefreshingProducts) {
            products = (<WaitLoader size='lg' msg=' ' />);
        }


        return (
            <>
                <section className="Listing">
                    <div className="container">

                        <ListingHeader category={this.props.selectedCategory} sortFilterCode={this.props.sortFilterCode} onSortFilterClick={this.onSortFilterClick} />

                        <div className="row gutter-4">

                            {/* sidebar */}
                            <aside className="col-lg-3 sidebar">
                                <FilterByCategories categories={this.props.categories} onCategoryClicked={this.onCategoryClicked} />
                                <FilterByBrand brands={this.props.brands} onBrandFilterChanged={this.onBrandFilterChanged} />
                                <FilterByTeam teams={this.props.teams} onTeamFilterChange={this.onTeamFilterChange} />
                                {/* <FilterByColor /> */}
                                {/* <FilterByPrice /> */}
                            </aside>

                            {/* content */}
                            <div className="col-lg-9">
                                <div className="row gutter-2 gutter-lg-3">{products}</div>
                                <Pagination {...this.props.paginationData} onPageNumClick={this.onPageNumClick} />
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
        shouldDoPostRefreshProductsProcess: state.products.shouldDoPostRefreshProductsProcess,
        shouldDoPostReadFiltersProcess: state.products.shouldDoPostReadFiltersProcess,
        message: state.products.message,
        shouldRefreshProducts: state.products.shouldRefreshProducts,
        currentPageNum: state.products.currentPageNum,
        brands: state.products.brands,
        sortFilterCode: state.products.sortFilterCode,
        selectedCategory: state.products.selectedCategory,
        teams: state.products.teams,
        categories: state.products.categories,
        products: state.products.products,
        paginationData: state.products.paginationData
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        endRefreshProductsProcess: () => dispatch(productsActions.endRefreshProductsProcess()),
        endReadFiltersProcess: () => dispatch(productsActions.endReadFiltersProcess()),
        onUrlChanged: () => dispatch(productsActions.onUrlChanged()),
        readProducts: (params) => dispatch(productsActions.readProducts(params)),
        readFilters: () => dispatch(productsActions.readFilters())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listing));