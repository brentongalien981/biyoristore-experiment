import React from 'react';
import BreadcrumbsLight from '../../theme-components/BreadcrumbsLight';
import ProductMainSection from './ProductMainSection';
import ProductExtraInfo from './ProductExtraInfo';
import SuggestedProducts from './SuggestedProducts';
import ProductReviews from './ProductReviews';
import CreateReview from './CreateReview';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import { connect } from 'react-redux';
import * as actions from '../../actions/productInDetails';



class ProductInDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }



    componentDidMount() {
        Bs.log("\n####################");
        Bs.log("In CLASS: ProductInDetails, METHOD: componentDidMount()");

        Bs.log("this.props ==> ...");
        Bs.log(this.props);
        Bs.log("this.props.message ==> " + this.props.message);

        const urlParams = this.props.location.search;
        const acceptedParams = ["productId"];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);
        this.props.readProduct(parsedUrlParams['productId']);
    }



    componentDidUpdate() {
        Bs.log("\n####################");
        Bs.log("In CLASS: ProductInDetails, METHOD: componentDidUpdate()");

        Bs.log("this.props ==> ...");
        Bs.log(this.props);

        if (this.props.shouldRelaunchVendorScript) {
            this.props.relaunchVendorScript();
        }
    }



    render() {
        return (
            <>
                <BreadcrumbsLight />
                <ProductMainSection product={this.props.product} />
                <ProductExtraInfo />
                <SuggestedProducts products={this.props.relatedProducts} />

                {/* TODO */}
                <ProductReviews reviews={this.props.reviews} />
                <CreateReview />
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        product: state.productInDetails.product,
        shouldRelaunchVendorScript: state.productInDetails.shouldRelaunchVendorScript,
        message: state.productInDetails.message,
        relatedProducts: state.productInDetails.relatedProducts,
        reviews: state.productInDetails.reviews,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProduct: (productId) => dispatch(actions.readProduct(productId)),
        relaunchVendorScript: () => dispatch(actions.relaunchVendorScript())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductInDetails));