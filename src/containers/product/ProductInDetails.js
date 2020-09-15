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

    componentDidMount() {
        Bs.log("\n####################");
        Bs.log("In CLASS: ProductInDetails, METHOD: componentDidMount()");

        Bs.log("this.props ==> ...");
        Bs.log(this.props);
        Bs.log("this.props.message ==> " + this.props.message);

        this.refreshProduct();
    }



    refreshProduct() {
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

        if (this.props.shouldResetProduct) { this.refreshProduct(); }

        if (this.props.shouldRelaunchVendorScript) { this.props.relaunchVendorScript(); }

        Bs.log("End of METHOD: componentDidUpdate(), CLASS: ProductInDetails");
        Bs.log("@@@@@@@@@@@@@@@@@@@@");

    }



    render() {
        return (
            <>
                <BreadcrumbsLight />
                {/* <button onClick={this.testDeleteProduct}>TEST</button>
                <button onClick={this.testReadNewProduct}>TEST READ NEW PRODUCT</button> */}
                <ProductMainSection product={this.props.product} />
                <ProductExtraInfo product={this.props.product} />
                <SuggestedProducts relatedProducts={this.props.relatedProducts} onProductClicked={this.onProductClicked} />

                {/* TODO */}
                <ProductReviews reviews={this.props.reviews} />
                <CreateReview />
            </>
        );
    }



    onProductClicked = (e, props, product) => {
        Bs.log("\n###############");
        Bs.log("In CLASS: ProductInDetails, METHOD: onProductClicked()");

        e.preventDefault();
        e.stopPropagation();

        this.props.history.push("/product?productId=" + product.id);

        this.props.resetProduct();

    };
}



const mapStateToProps = (state) => {
    return {
        product: state.productInDetails.product,
        shouldResetProduct: state.productInDetails.shouldResetProduct,
        shouldRelaunchVendorScript: state.productInDetails.shouldRelaunchVendorScript,
        message: state.productInDetails.message,
        relatedProducts: state.productInDetails.relatedProducts,
        reviews: state.productInDetails.reviews,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProduct: (productId) => dispatch(actions.readProduct(productId)),
        readRelatedProducts: (productId) => dispatch(actions.readRelatedProducts(productId)),
        relaunchVendorScript: () => dispatch(actions.relaunchVendorScript()),
        resetProduct: () => dispatch(actions.resetProduct())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withRouter(ProductInDetails)));