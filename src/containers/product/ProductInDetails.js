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
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import { queueAlert } from '../../actions/temporaryAlerts';
import TemporaryAlertSystem from '../../components/temporary-alert-system/TemporaryAlertSystem';




class ProductInDetails extends React.Component {

    /** REQUIRED: React's context. */
    static contextType = ProductInDetailsContext;



    setMyContext() {
        this.context.onAddToCart = this.onAddToCart;
        this.context.onSizeOptionClick = this.onSizeOptionClick;
    }



    /** PROPERTIES */
    state = {
        isReadingReviews: false,
        isSavingReview: false,
        newReview: { rating: 1, message: "" },
    };



    /** HELPER FUNCS */
    doPostOnSaveReviewProcess = () => {
        this.setState({
            isSavingReview: false,
            newReview: { rating: 1, message: "" },
        });
    };



    doActualOnSaveReviewProcess() {
        const data = {
            productId: this.props.product.id,
            ...this.state.newReview,
            doPostProcessCallback: this.doPostOnSaveReviewProcess
        };

        this.props.saveReview(data);
    }



    doPreOnSaveReviewProcess() {
        if (!BsAppSession.isLoggedIn()) { alert("You have to be signed in to make a review..."); return false; }
        if (this.state.isSavingReview) { return false; }
        if (this.props.product.id == 1) { return false; }

        const reviewMsg = this.state.newReview.message;
        if (reviewMsg.trim().length == 0) { alert("Message can not be empty..."); return false; }

        this.setState({
            isSavingReview: true
        });

        // Show message to user.
        const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: "Your review is now being saved. It should be posted shortly." });
        this.props.queueAlert(newAlertObj);

        return true;
    }



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
        // REQUIRED: Initialize contexts.
        this.setMyContext();

        this.refreshProduct();
    }



    componentDidUpdate() {
        if (this.props.shouldResetProduct) { this.refreshProduct(); }

        if (this.props.shouldRelaunchVendorScript) { this.props.relaunchVendorScript(); }

        if (this.props.shouldDoInitialReadReviews) { this.readReviews({ isInitialBatch: true }); }

        if (this.props.shouldDoPostReadReviewsProcess) { this.doPostReadReviewsProcess(); }
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

                <ProductReviews reviews={this.props.reviews} isReadingReviews={this.state.isReadingReviews} readReviews={this.readReviews} />
                <CreateReview newReview={this.state.newReview} onNewReviewInputChange={this.onNewReviewInputChange} onSaveReview={this.onSaveReview} />
            </>
        );
    }



    /** EVENT FUNCS */
    onNewReviewInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        const updatedNewReview = {
            ...this.state.newReview,
            [name]: value
        };

        this.setState({
            newReview: updatedNewReview
        });
    };



    onSaveReview = () => {
        if (this.doPreOnSaveReviewProcess()) {
            this.doActualOnSaveReviewProcess();
        }
    };



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
        Bs.log("onSizeOptionClick()");
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
        queueAlert: (obj) => dispatch(queueAlert(obj)),
        saveReview: (data) => dispatch(actions.saveReview(data)),
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