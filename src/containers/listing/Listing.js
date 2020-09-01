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



class Listing extends React.Component {

    componentDidMount() {
        Bs.log("\n####################");
        Bs.log("CLASS:: Listing, METHOD:: componentDidMount()");
        this.props.readProducts();
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
                                <FilterByBrand />
                                <FilterByColor />
                                <FilterByPrice />
                            </aside>

                            {/* content */}
                            <div className="col-lg-9">
                                <div className="row gutter-2 gutter-lg-3">{products}</div>
                                <Pagination />
                            </div>

                        </div>
                    </div>
                </section>
                <h4 style={{ color: "red" }}>COMMENT ==> {this.props.message}</h4>
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        message: state.products.message,
        products: state.products.products
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProducts: () => dispatch(productsActions.readProducts())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Listing);