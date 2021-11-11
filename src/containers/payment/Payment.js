import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import BsCore from '../../bs-library/helpers/BsCore';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Payment.css";
import PaymentForm from "./PaymentForm";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPaymentFinalizationPageEntryCode, setPaymentPageEntryCode } from '../../actions/checkout';
import { getProjectedTotalDeliveryDays } from '../checkout/helper-funcs/HelperFuncsA';



class Payment extends React.Component {

    /* PROPERTIES */
    static HAS_VALID_PAGE_DATA_REQUIREMENTS = false;



    /* HELPER FUNCS */
    getCartItemsData() {
        const cartItems = this.props.location.state.cartItems;
        let data = [];

        cartItems.forEach(i => {
            const item = { productId: i.product.id, quantity: i.quantity, sellerProductId: i.sellerProductId };
            data.push(item);
        });

        return data;
    }



    doesCartHaveItem() {
        if (this.props.location.state.cartItems.length >= 1) { return true; }
        return false;
    }



    checkShippingAddress() {
        if (this.props.location.state.shippingAddress) { return true; }
        return false;
    }



    checkPageEntryCode() {

        const passedState = this.props.location.state;
        if (passedState) {

            Bs.log("\nthis.props.location.state ==> ...");
            Bs.log(this.props.location.state);


            // Check if loading this webpage is coming from the checkout-page's 
            // order-details confirmation.
            const actualPageEntryCode = this.props.paymentPageEntryCode;
            const passedPageEntryCode = passedState.paymentPageEntryCode;

            if (!actualPageEntryCode || actualPageEntryCode === "" ||
                !passedPageEntryCode || passedPageEntryCode === "" ||
                actualPageEntryCode !== passedPageEntryCode) {
                return false;
            }


            Bs.log("\nthis.props.paymentPageEntryCode ==> " + this.props.paymentPageEntryCode);
            Bs.log("this.props.location.state.paymentPageEntryCode ==> " + this.props.location.state.paymentPageEntryCode);

            return true;

        }

        return false;
    }



    checkPageDataRequirements() {

        Payment.HAS_VALID_PAGE_DATA_REQUIREMENTS = false;

        if (!this.checkPageEntryCode()) { alert("Please confirm your order details first."); return false; }
        if (!this.checkShippingAddress()) { alert("Invalid shipping info."); return false; }
        if (!this.doesCartHaveItem()) { alert("No cart items..."); return false; }

        Payment.HAS_VALID_PAGE_DATA_REQUIREMENTS = true;

        return true;
    }



    /* MAIN FUNCS */
    constructor(props) {
        super(props);

        Bs.log("\n\n##############################");
        Bs.log("In FILE: Payment.js, METHOD: constructor()...");

        if (!this.checkPageDataRequirements()) {
            this.props.history.replace("/checkout");
            return;
        }


        // Make sure to call loadStripe outside of a component’s render to avoid
        // recreating the Stripe object on every render.
        // loadStripe is initialized with your real test publishable API key.
        /**
         * BMD-ON-STAGING
         * - Maybe move this to componendDidMount()
         * - Make an AJAX-request for this info instead of hard-coding and showing this info to public
         * - Use stripe-production-pk.
         */
        // BMD-SENSITIVE-INFO
        this.promise = loadStripe("pk_test_51HbnWfBQWOThz1xMxYTQAjuuDdoSsGMtHQi9XN5WCwfgFA66EvZOH5G9NKtDJ2NGR5TxKCdTfGqXotF3Pi1BoNlr00GwZCC38H");
    }



    componentDidMount() {
        this.props.setPaymentFinalizationPageEntryCode();
    }



    componentWillUnmount() {

        Bs.log("\n\n##############################");
        Bs.log("In FILE: Payment.js, METHOD: componentWillUnmount()...");
        Bs.log("dispatching METHOD: setPaymentPageEntryCode()...");
        this.props.setPaymentPageEntryCode();

    }



    render() {

        if (!Payment.HAS_VALID_PAGE_DATA_REQUIREMENTS) { return null; }

        const shippingAddress = this.props.location.state.shippingAddress;
        const cartItemsData = this.getCartItemsData();

        return (
            <>
                <section className="hero" id="theSection">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <h2>Payment</h2>
                                {this.getCreditCardNumsNotesForDemo()}
                            </div>
                        </div>
                    </div>
                </section>


                <Elements stripe={this.promise}>
                    <PaymentForm
                        paymentFinalizationPageEntryCode={this.props.paymentFinalizationPageEntryCode}
                        cart={this.props.cart} shippingAddress={shippingAddress}
                        shipmentRate={this.props.shipmentRate}
                        projectedTotalDeliveryDays={getProjectedTotalDeliveryDays(this.props.cart.cartItems, this.props.shipmentRate)}
                        cartItemsData={cartItemsData} />
                </Elements>
            </>
        );
    }



    getCreditCardNumsNotesForDemo() {
        return (
            <div id="creditCardNumsNotesForDemo">
                <h5>For demo purposes, you can use:</h5>
                <p id="workingCreditCardSection">
                    Working Canadian Credit Card #: 4000 0012 4000 0000<br />
                    Any Valid MM / YY CVC<br />
                    Any Postal Code
                </p>
                <p id="failingCreditCardSection">
                    Failing US Credit Card #: 4000 0000 0000 9995<br />
                    Any Valid MM / YY CVC<br />
                    Any ZIP Code
                </p>
            </div>
        );
    }



    /* EVENT FUNCS */
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        shipmentRate: state.checkout.shipmentRate,
        paymentFinalizationPageEntryCode: state.checkout.paymentFinalizationPageEntryCode,
        paymentPageEntryCode: state.checkout.paymentPageEntryCode,
        cart: state.cart.cart,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        setPaymentPageEntryCode: () => dispatch(setPaymentPageEntryCode()),
        setPaymentFinalizationPageEntryCode: () => dispatch(setPaymentFinalizationPageEntryCode()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payment));