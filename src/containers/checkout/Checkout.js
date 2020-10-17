import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import BsCore from '../../bs-library/helpers/BsCore';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Checkout.css";



class Checkout extends React.Component {

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
        // BsCore.ajaxCrud({
        //     url: '/paymentIntent',
        //     method: "post",
        //     params: {},
        //     neededResponseParams: ["clientSecret"],
        //     callBackFunc: (requestData, json) => { 
        //         Bs.log("\n#####################");
        //         Bs.log("FILE: Checkout.js, METHOD: componentDidMount() => ajaxCrud() => callBackFunc()");

        //         Bs.log("json.clientSecret ==> " + json.clientSecret);
        //     }
        // });
    }

    render() {
        return (
            <>
                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <h1>Checkout</h1>
                            </div>
                        </div>
                    </div>
                </section>


                <Elements stripe={this.promise}>
                    <CheckoutForm />
                </Elements>
            </>
        );
    }



    /* EVENT FUNCS */
}



export default Checkout;