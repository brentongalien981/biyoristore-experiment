import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/checkout';
import Bs from '../../bs-library/helpers/Bs';



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
        // this.props.setPredefinedPaymentFinalizationPageEntryCode();
    }



    componentDidMount() {

        // ish
        if (!this.checkPageEntryCode()) {
            alert("Please confirm your order first.");
            this.props.history.replace("/checkout");
            return;

        }
        // TODO: Check page-data-requirements.
    }



    render() {

        return (
            <section className="hero" style={{ paddingTop: "200px", paddingBottom: "300px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h3>CheckoutFinalization</h3>
                        </div>
                    </div>

                </div>
            </section>
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
        actualPageEntryCode: state.checkout.checkoutFinalizationPageEntryCode,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        // setPredefinedPaymentFinalizationPageEntryCode: () => dispatch(actions.setPredefinedPaymentFinalizationPageEntryCode()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutFinalization));