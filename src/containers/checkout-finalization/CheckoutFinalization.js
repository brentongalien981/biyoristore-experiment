import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/checkout';
import Bs from '../../bs-library/helpers/Bs';
import OrderInfo from './OrderInfo';
import OrderTable from './OrderTable';



class CheckoutFinalization extends React.Component {

    /* PROPERTIES */
    // static unblockNavBlocker = null;



    /* HELPER FUNCS */
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
        this.props.setPaymentFinalizationPageEntryCode();
        this.props.setPredefinedPaymentFinalizationPageEntryCode();
    }



    render() {

        return (
            <>
                {/* page header */}
                <section className="hero">
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
                <OrderTable orderItems={this.props.cartItems} shipmentRate={this.props.shipmentRate} />


                <div className="container">
                    <div className="row justify-content-center">
                        <OrderInfo cartItems={this.props.cartItems} shipmentRate={this.props.shipmentRate} paymentMethod={this.props.paymentMethod} shippingInfo={this.props.shippingInfo} />
                    </div>
                </div>
            </>
        );
    }



    /* EVENT FUNCS */
    // TODO:
    onOrderDetailsConfirm = () => {

        let redirectPage = "/payment";
        let redirectPageDataRequirements = {};


        if (this.isPaymentMethodPredefined()) {

            Bs.log("payment method is predefined, redirect to predefined-payment-page");

            // set redirect-page's data-requirements
            redirectPage = "/predefined-payment-finalization";
            redirectPageDataRequirements = {
                pageEntryCode: this.props.predefinedPaymentFinalizationPageEntryCode,
                paymentMethodId: this.state.paymentMethod.id,
                shippingInfo: this.state.address,
                cartItems: this.props.cartItems,
            };
        }
        else {

            //
            Bs.log("payment method is NOT predefined, redirect to payment-page");

            // set payment-page's data-requirements
            redirectPageDataRequirements = {
                cartItems: this.props.cartItems,
                shippingAddress: this.state.address,
                paymentPageEntryCode: this.props.paymentPageEntryCode
            };
        }


        //
        Bs.log("redirectPageDataRequirements ==> ...");
        Bs.log(redirectPageDataRequirements);

        // redirect
        this.props.history.push(redirectPage, redirectPageDataRequirements);
    };
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        paymentMethod: state.checkout.paymentMethod,
        shippingInfo: state.checkout.shippingInfo,
        cartItems: state.cart.cart.cartItems,
        shipmentRate: state.checkout.shipmentRate,
        // shipmentRateId: state.checkout.shipmentRateId,
        shipmentId: state.checkout.shipmentId,
        actualPageEntryCode: state.checkout.checkoutFinalizationPageEntryCode
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        setCheckoutFinalizationPageEntryCode: () => dispatch(actions.setCheckoutFinalizationPageEntryCode()),
        setPredefinedPaymentFinalizationPageEntryCode: () => dispatch(actions.setPredefinedPaymentFinalizationPageEntryCode()),
        setPaymentFinalizationPageEntryCode: () => dispatch(actions.setPaymentFinalizationPageEntryCode())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutFinalization));