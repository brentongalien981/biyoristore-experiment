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

    /* HELPER FUNCS */



    /* MAIN FUNCS */
    constructor(props) {
        super(props);

        // Make sure to call loadStripe outside of a component’s render to avoid
        // recreating the Stripe object on every render.
        // loadStripe is initialized with your real test publishable API key.
        this.promise = loadStripe("pk_test_51HbnWfBQWOThz1xMxYTQAjuuDdoSsGMtHQi9XN5WCwfgFA66EvZOH5G9NKtDJ2NGR5TxKCdTfGqXotF3Pi1BoNlr00GwZCC38H");

    }



    componentDidMount() {
        Bs.log("\n\n##############################");
        Bs.log("In FILE: Payment.js, METHOD: componentDidMount()...");

        Bs.log("\nBEFORE:: this.props.location.state ==> ...");
        Bs.log(this.props.location.state);

        Bs.log("\nthis.props.paymentPageEntryCode ==> " + this.props.paymentPageEntryCode);
        Bs.log("this.props.location.state.paymentPageEntryCode ==> " + this.props.location.state.paymentPageEntryCode);
    }



    render() {
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
                    <PaymentForm />
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
    };
};



export default connect(mapStateToProps, null)(withRouter(Payment));