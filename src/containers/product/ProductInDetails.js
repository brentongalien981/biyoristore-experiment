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
        this.state = { hasError: false };
    }



    componentDidMount() {
        Bs.log("\n####################");
        Bs.log("In CLASS: ProductInDetails, METHOD: componentDidMount()");

        Bs.log("this.props ==> ...");
        Bs.log(this.props);
        Bs.log("this.props.message ==> " + this.props.message);

        this.refreshProduct();
    }



    refreshProduct() {
        Bs.log("**************************");
        Bs.log("*** REFRESHING PRODUCT ***");
        Bs.log("**************************");
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

        this.checkHasProductChanged();

        if (this.props.shouldRelaunchVendorScript) {
            Bs.log("***************************");
            Bs.log("*** RELAUNCHING SCRIPT ***");
            Bs.log("***************************");
            this.props.relaunchVendorScript();
        }

        Bs.log("End of METHOD: componentDidUpdate(), CLASS: ProductInDetails");
        Bs.log("@@@@@@@@@@@@@@@@@@@@");

    }



    checkHasProductChanged() {
        Bs.log("\n####################");
        Bs.log("In CLASS: ProductInDetails, METHOD: checkHasProductChanged()");

        const previousProductId = this.props.product.id ? parseInt(this.props.product.id) : 0;

        const acceptedParams = ["productId"];
        const urlQuery = this.props.location.search;
        const parsedQueryParams = Bs.getParsedQueryParams(urlQuery, acceptedParams);
        const newProductId = parsedQueryParams["productId"] ? parseInt(parsedQueryParams["productId"]) : 1;

        Bs.log("previousProductId ==> " + previousProductId);
        Bs.log("newProductId ==> " + newProductId);

        Bs.log("previousProductId != newProductId ==> " + (previousProductId !== newProductId));

        if (previousProductId !== newProductId) {
            this.refreshProduct();
        }
    }



    render() {
        return (
            <>
                <BreadcrumbsLight />
                <button onClick={this.testDeleteProduct}>TEST</button>
                {/* <ProductMainSection product={this.props.product} shouldResetGallery={this.props.shouldResetGallery} /> */}
                <ProductMainSection product={this.props.product} />
                <ProductExtraInfo product={this.props.product} />
                <SuggestedProducts relatedProducts={this.props.relatedProducts} onProductClicked={this.onProductClicked} />

                {/* TODO */}
                <ProductReviews reviews={this.props.reviews} />
                <CreateReview />
            </>
        );
    }



    testDeleteProduct = () => {
        // this.props.testDeleteProduct();
        try {
            this.props.testDeleteProduct();
        } catch (error) {
            Bs.log("\n####################");
            Bs.log("ERROR ERROR ERROR");
        }
    };



    onProductClicked = (e, props, product) => {
        Bs.log("\n###############");
        Bs.log("In CLASS: ProductInDetails, METHOD: onProductClicked()");

        e.preventDefault();
        e.stopPropagation();

        this.props.history.push("/product?productId=" + product.id);

    };
}



const mapStateToProps = (state) => {
    return {
        product: state.productInDetails.product,
        shouldResetGallery: state.productInDetails.shouldResetGallery,
        shouldRefreshProduct: state.productInDetails.shouldRefreshProduct,
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
        // onProductClicked: (props, product) => dispatch(actions.onProductClicked(props, product))
        testDeleteProduct: () => dispatch({ type: 'TEST_DELETE_PRODUCT' })
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withRouter(ProductInDetails)));