import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions/checkout';
import Bs from '../../bs-library/helpers/Bs';
import OrderInfo from './OrderInfo';
import OrderTable from './OrderTable';



class CheckoutFinalization extends React.Component {

    /* PROPERTIES */



    /* HELPER FUNCS */
    isPaymentMethodPredefined() {
        if (this.props.paymentMethod.id != null && this.props.paymentMethod.id !== 0) { return true; }
        return false;
    }


    checkPageEntryCode() {

        const passedState = this.props.location.state;

        if (passedState) {
            // Check if loading this webpage is coming from the checkout-page's 
            // order-details confirmation.
            const actualPageEntryCode = this.props.actualPageEntryCode;
            const passedPageEntryCode = passedState.pageEntryCode;

            if (!actualPageEntryCode || actualPageEntryCode === "" ||
                !passedPageEntryCode || passedPageEntryCode === "" ||
                actualPageEntryCode !== passedPageEntryCode) {
                return false;
            }

            return true;

        }

        return false;
    }



    /* MAIN FUNCS */
    componentWillUnmount() {
        this.props.setCheckoutFinalizationPageEntryCode();
    }



    componentDidMount() {

        // Check page-data-requirements.
        if (!this.checkPageEntryCode()
            || (this.props.shipmentId === null || this.props.shipmentId === "")
            || (!this.props.shipmentRate || this.props.shipmentRate.id === "")
        ) {
            alert("Please confirm your order first.");
            this.props.history.replace("/checkout");
            return;
        }


        // set the page-entry-codes for the possible-next-sequential-pages
        this.props.setPaymentPageEntryCode();
        this.props.setPredefinedPaymentFinalizationPageEntryCode();
    }



    render() {

        return (
            <>
                {/* page header */}
                <section className="hero pb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <h1>Finalize Order</h1>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="container pt-8 pb-2">
                    <h4>Items</h4>
                </div>

                <OrderTable orderItems={this.props.cartItems} shipmentRate={this.props.shipmentRate} onPay={this.onPay} />


                <div className="container">
                    <div className="row justify-content-center mb-1">
                        <OrderInfo cartItems={this.props.cartItems} shipmentRate={this.props.shipmentRate} paymentMethod={this.props.paymentMethod} shippingInfo={this.props.shippingInfo} />
                    </div>
                    <Link to="/checkout" className="btn btn-warning">Edit Order Details</Link>
                </div>
            </>
        );
    }



    /* EVENT FUNCS */
    onPay = () => {

        let redirectPage = "/payment";
        let redirectPageDataRequirements = {};

        if (this.isPaymentMethodPredefined()) {

            // set redirect-page's data-requirements
            redirectPage = "/predefined-payment-finalization";
            redirectPageDataRequirements = {
                pageEntryCode: this.props.predefinedPaymentFinalizationPageEntryCode,
                paymentMethodId: this.props.paymentMethod.id,
                shippingInfo: this.props.shippingInfo,
                cartItems: this.props.cartItems,
            };
        }
        else {

            // set payment-page's data-requirements
            redirectPageDataRequirements = {
                cartItems: this.props.cartItems,
                shippingAddress: this.props.shippingInfo,
                paymentPageEntryCode: this.props.paymentPageEntryCode
            };
        }


        // redirect
        this.props.history.push(redirectPage, redirectPageDataRequirements);
    };
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        paymentPageEntryCode: state.checkout.paymentPageEntryCode,
        predefinedPaymentFinalizationPageEntryCode: state.checkout.predefinedPaymentFinalizationPageEntryCode,
        paymentMethod: state.checkout.paymentMethod,
        shippingInfo: state.checkout.shippingInfo,
        cartItems: state.cart.cart.cartItems,
        shipmentRate: state.checkout.shipmentRate,
        shipmentId: state.checkout.shipmentId,
        actualPageEntryCode: state.checkout.checkoutFinalizationPageEntryCode
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        setCheckoutFinalizationPageEntryCode: () => dispatch(actions.setCheckoutFinalizationPageEntryCode()),
        setPredefinedPaymentFinalizationPageEntryCode: () => dispatch(actions.setPredefinedPaymentFinalizationPageEntryCode()),
        setPaymentPageEntryCode: () => dispatch(actions.setPaymentPageEntryCode())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutFinalization));