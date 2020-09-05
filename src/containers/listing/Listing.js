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

        Bs.log("\n####################");
        Bs.log("this.props ==> ...");
        Bs.log(this.props);

        this.checkHasPageNumberChanged();


    }



    checkHasPageNumberChanged() {
        Bs.log("\n####################");
        Bs.log("CLASS:: Listing, METHOD:: checkHasPageNumberChanged()");

        const previousPageNum = this.props.paginationData.currentPageNum;

        const acceptedParams = ["page", "search"];
        const urlQuery = this.props.location.search;
        const parsedQueryParams = Bs.getParsedQueryParams(urlQuery, acceptedParams);
        const newPageNum = parsedQueryParams["page"];

        Bs.log("\n####################");
        Bs.log("previousPageNum ==> " + previousPageNum);
        Bs.log("newPageNum ==> " + newPageNum);

        if (previousPageNum != newPageNum) {
            this.props.readProducts(parsedQueryParams);
        }
    }



    render() {

        const products = this.props.products.map((p, i) => {
            return (
                <div className="col-6 col-md-4" key={i}>
                    <Product product={p} />
                </div>
            );
        });

        return (
            <>
                <section className="Listing">
                    <div className="container">

                        <ListingHeader />

                        <div className="row gutter-4">

                            {/* sidebar */}
                            <aside className="col-lg-3 sidebar">
                                <FilterByCategories />
                                <FilterByBrand brands={this.props.brands} />
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
                <h4 style={{ color: "red" }}>COMMENT ==&gt; {this.props.message}</h4>
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        message: state.products.message,
        brands: state.products.brands,
        products: state.products.products,
        paginationData: state.products.paginationData
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProducts: (params) => dispatch(productsActions.readProducts(params)),
        readBrands: () => dispatch(productsActions.readBrands())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listing));