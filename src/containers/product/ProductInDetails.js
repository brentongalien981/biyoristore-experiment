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
import BlankBreadCrumbsSubstitute from '../../components/customized-spacers/BlankBreadCrumbsSubstitute';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import BsJLS from '../../bs-library/helpers/BsJLS';
import * as cartWidgetHelperFuncs from '../../components/cart/helper-funcs/HelperFuncsA';
import { transitionScrollToTop } from './helper-funcs/HelperFuncsA';
import BmdAuth from '../../bs-library/core/BmdAuth';




class ProductInDetails extends React.Component {

    /** REQUIRED: React's context. */
    static contextType = ProductInDetailsContext;



    setMyContext() {
        this.context.onAddToCart = this.onAddToCart;
        this.context.onSizeOptionClick = this.onSizeOptionClick;
    }



    /** PROPERTIES */
    state = {
        isReadingProduct: false,
        isReadingReviews: false,
        isSavingReview: false,
        isAddingItemToCart: false,
        newReview: { rating: 1, message: "" },
        selectedSizeObj: null
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
        if (!BmdAuth.isLoggedIn()) { alert("You have to be signed in to make a review..."); return false; }
        if (this.state.isSavingReview) { return false; }
        if (this.props.product.id == 0) { return false; }

        const reviewMsg = this.state.newReview.message;
        if (reviewMsg.trim().length == 0) { alert("Message can not be empty..."); return false; }

        this.setState({
            isSavingReview: true
        });

        // Show message to user.
        const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: "Your review is pending..." });
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



    refreshProduct = () => {
        
        if (this.state.isReadingProduct) { return; }

        this.setState({ isReadingProduct: true });

        const urlParams = this.props.location.search;
        const acceptedParams = ["productId"];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);

        const data = {
            productId: parsedUrlParams['productId'],
            doCallBackFunc: () => {
                // This delay is necessary to avoid error from redux.
                setTimeout(() => {
                    this.setState({ isReadingProduct: false });
                    document.querySelector('#shouldRelaunchVendorScript').click();
                }, 100);

            }
        };

        this.props.readProduct(data);
    };



    /** MAIN FUNCS */
    componentDidMount() {
        // REQUIRED: Initialize contexts.
        this.setMyContext();

        transitionScrollToTop();

        this.refreshProduct();
    }


    
    componentDidUpdate() {

        if (this.props.shouldResetProduct) { 
            // This delay is necessary to avoid error from redux.
            setTimeout(() => {
                this.refreshProduct(); 
            }, 100);
        }

        if (this.props.shouldDoInitialReadReviews) { this.readReviews({ isInitialBatch: true }); }

        if (this.props.shouldDoPostReadReviewsProcess) { this.doPostReadReviewsProcess(); }
    }



    render() {

        return (
            <>
                {/* FOR-DBUG: DON'T DELET: This is the workaround for the error that the vendor-theme-package produces. */}
                {/* <button onClick={this.testDeleteProduct}>TEST</button> */}
                {/* <button onClick={this.testReadNewProduct}>TEST READ NEW PRODUCT</button> */}

                <BlankBreadCrumbsSubstitute />
                <ProductMainSection product={this.props.product} isAddingItemToCart={this.state.isAddingItemToCart} isReadingProduct={this.state.isReadingProduct} />
                <ProductExtraInfo product={this.props.product} avgRating={this.props.avgRating} isReadingProduct={this.state.isReadingProduct} />
                <SuggestedProducts relatedProducts={this.props.relatedProducts} onProductClicked={this.onProductClicked} isReadingProduct={this.state.isReadingProduct} />

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

        this.props.history.push("/product?productId=" + productId);

        this.props.resetProduct();

        transitionScrollToTop();

    };



    onAddToCart = (e, product) => {

        e.preventDefault();
        e.stopPropagation();

        if (this.state.isAddingItemToCart) { return; }
        if (!this.state.selectedSizeObj) { alert('Please select an available size'); return; }

        this.setState({ isAddingItemToCart: true });


        const bmdHttpRequestData = cartWidgetHelperFuncs.prepareCartBmdHttpRequestData();

        const data = {
            bmdHttpRequest: bmdHttpRequestData,
            params: {
                ...bmdHttpRequestData.params,
                productId: product.id,
                sellerProductId: product.mostEfficientSeller.productSeller.id,
                sizeAvailabilityId: this.state.selectedSizeObj.id,
            },
            doCallBackFunc: () => {
                this.setState({ isAddingItemToCart: false });
            }
        };


        this.props.onAddToCart(data);
    };



    onSizeOptionClick = (selectedSizeObj) => {
        Bs.log("onSizeOptionClick()");
        Bs.log("possibleSize ==> ...");
        Bs.log(selectedSizeObj);
        this.setState({ selectedSizeObj: selectedSizeObj });
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
        onAddToCart: (data) => dispatch(onAddToCart(data)),
        readProduct: (data) => dispatch(actions.readProduct(data)),
        readRelatedProducts: (productId) => dispatch(actions.readRelatedProducts(productId)),
        relaunchVendorScript: () => dispatch(actions.relaunchVendorScript()),
        resetProduct: () => dispatch(actions.resetProduct())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withRouter(ProductInDetails)));