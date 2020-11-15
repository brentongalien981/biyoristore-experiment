import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import BsCore from '../../bs-library/helpers/BsCore';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Payment.css";
import PaymentForm from "./PaymentForm";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



class Payment extends React.Component {

    /* PROPERTIES */
    static HAS_VALID_PAGE_DATA_REQUIREMENTS = false;



    /* HELPER FUNCS */
    getCartItemsData() {
        const cartItems = this.props.location.state.cartItems;
        let data = [];

        cartItems.forEach(i => {
            const item = { id: i.id, productId: i.product.id, quantity: i.quantity };
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

        if (!this.checkPageEntryCode()) { alert("Please confirm your order details first"); return false; }
        if (!this.checkShippingAddress()) { return false; }
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
        this.promise = loadStripe("pk_test_51HbnWfBQWOThz1xMxYTQAjuuDdoSsGMtHQi9XN5WCwfgFA66EvZOH5G9NKtDJ2NGR5TxKCdTfGqXotF3Pi1BoNlr00GwZCC38H");

    }



    componentDidMount() {
        // Bs.log("\n\n##############################");
        // Bs.log("In FILE: Payment.js, METHOD: componentDidMount()...");
    }



    render() {

        if (!Payment.HAS_VALID_PAGE_DATA_REQUIREMENTS) { return null; }

        const shippingAddress = this.props.location.state.shippingAddress;
        const cartItemsData = this.getCartItemsData();

        return (
            <>
                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <h1>Payment</h1>
                            </div>
                        </div>
                    </div>
                </section>


                <Elements stripe={this.promise}>
                    <PaymentForm cart={this.props.cart} shippingAddress={shippingAddress} cartItemsData={cartItemsData} setCartId={this.props.setCartId} />
                </Elements>
            </>
        );
    }



    /* EVENT FUNCS */
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        paymentPageEntryCode: state.checkout.paymentPageEntryCode,
        cart: state.cart.cart,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        // TODO:
        // setCartId: (cartId) => dispatch(actions.setCartId()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payment));