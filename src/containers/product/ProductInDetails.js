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
import ProductInDetailsContext from '../../contexts/product/ProductInDetailsContext';
import { onAddToCart } from '../../actions/cart';
import './ProductInDetails.css';



class ProductInDetails extends React.Component {

    /** REQUIRED: React's context. */
    static contextType = ProductInDetailsContext;



    setMyContext() {
        this.context.onAddToCart = this.onAddToCart;
        this.context.onSizeOptionClick = this.onSizeOptionClick;
    }



    /** PROPERTIES */
    state = {
        isReadingReviews: false
    };



    /** HELPER FUNCS */
    doPostReadReviewsProcess() {
        this.setState({
            isReadingReviews: false
        });

        this.props.endReadReviewsProcess();
    }



    doActualReadReviewProcess = (data) => {
        const params = {
            productId: this.props.product.id,
            shownReviewsCount: data.isInitialBatch ? 0 : this.props.reviews.length
        };

        this.props.readReviews(params);
    };

    doPreReadReviewProcess = () => {
        if (this.state.isReadingReviews) { return false; }
        this.setState({
            isReadingReviews: true
        });

        return true;
    };



    refreshProduct() {
        const urlParams = this.props.location.search;
        const acceptedParams = ["productId"];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);
        this.props.readProduct(parsedUrlParams['productId']);
    }



    /** MAIN FUNCS */
    componentDidMount() {
        Bs.log("\n####################");
        Bs.log("In CLASS: ProductInDetails, METHOD: componentDidMount()");

        Bs.log("this.props ==> ...");
        Bs.log(this.props);
        Bs.log("this.props.message ==> " + this.props.message);

        // REQUIRED: Initialize contexts.
        this.setMyContext();

        this.refreshProduct();
    }



    componentDidUpdate() {
        if (this.props.shouldResetProduct) { this.refreshProduct(); }

        if (this.props.shouldRelaunchVendorScript) { this.props.relaunchVendorScript(); }

        if (this.props.shouldDoInitialReadReviews) { this.readReviews({ isInitialBatch: true }); }

        if (this.props.shouldDoPostReadReviewsProcess) { this.doPostReadReviewsProcess(); }
        //ish

    }



    render() {
        return (
            <>
                <BreadcrumbsLight breadCrumbLinks={this.props.breadCrumbLinks} />
                {/* <button onClick={this.testDeleteProduct}>TEST</button>
                <button onClick={this.testReadNewProduct}>TEST READ NEW PRODUCT</button> */}
                <ProductMainSection product={this.props.product} />
                <ProductExtraInfo product={this.props.product} avgRating={this.props.avgRating} />
                <SuggestedProducts relatedProducts={this.props.relatedProducts} onProductClicked={this.onProductClicked} />

                {/* TODO */}
                <ProductReviews reviews={this.props.reviews} isReadingReviews={this.state.isReadingReviews} readReviews={this.readReviews} />
                <CreateReview />
            </>
        );
    }



    /** EVENT FUNCS */
    readReviews = (data) => {
        if (this.doPreReadReviewProcess()) {
            this.doActualReadReviewProcess(data);
        }
    };



    onProductClicked = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        Bs.log("\n###############");
        Bs.log("In CLASS: ProductInDetails, METHOD: onProductClicked()");

        this.props.history.push("/product?productId=" + productId);

        this.props.resetProduct();

    };



    onAddToCart = (e, product) => {

        e.preventDefault();
        e.stopPropagation();

        Bs.log("\n####################");
        Bs.log("Using React's Context!");
        Bs.log("In CLASS: ProductInDetails, METHOD: onAddToCart()");

        Bs.log("product ==> ...");
        Bs.log(product);

        this.props.onAddToCart(product);
    };



    onSizeOptionClick = (possibleSize) => {
        Bs.log("TODO: onSizeOptionClick()");
        Bs.log("possibleSize ==> " + possibleSize);
    };
}



const mapStateToProps = (state) => {
    return {
        shouldDoInitialReadReviews: state.productInDetails.shouldDoInitialReadReviews,
        shouldDoPostReadReviewsProcess: state.productInDetails.shouldDoPostReadReviewsProcess,
        avgRating: state.productInDetails.avgRating,
        breadCrumbLinks: state.productInDetails.breadCrumbLinks,
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
        endReadReviewsProcess: () => dispatch(actions.endReadReviewsProcess()),
        readReviews: (params) => dispatch(actions.readReviews(params)),
        onAddToCart: (product) => dispatch(onAddToCart(product)),
        readProduct: (productId) => dispatch(actions.readProduct(productId)),
        readRelatedProducts: (productId) => dispatch(actions.readRelatedProducts(productId)),
        relaunchVendorScript: () => dispatch(actions.relaunchVendorScript()),
        resetProduct: () => dispatch(actions.resetProduct())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withRouter(ProductInDetails)));