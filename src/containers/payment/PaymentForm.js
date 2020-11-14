import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Bs from "../../bs-library/helpers/Bs";
import BsCore2 from "../../bs-library/helpers/BsCore2";
import { withRouter } from "react-router-dom";



function PaymentForm(props) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        BsCore2.ajaxCrud({
            url: '/paymentIntent',
            method: "post",
            // TODO: Pass in the order details.
            params: {},
            neededResponseParams: ["clientSecret"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: CheckoutForm.js, METHOD: useEffect() => ajaxCrud() => callBackFunc()");

                if (json.customError) {
                    alert("Sorry, there's a proble on our end. Please try again shortly.");
                    props.history.replace("/checkout");
                    return;
                }


                setClientSecret(json.clientSecret);
            }
        });
    }, []);



    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };



    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };



    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);

            // TODO: Save the order record.
        }
    };



    return (
        <form id="payment-form" className="payment-form" onSubmit={handleSubmit}>

            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />

            <button
                className="payment-button"
                disabled={processing || disabled || succeeded}
                id="submit">

                <span id="button-text">
                    {processing ? (<div className="spinner" id="spinner"></div>) : ("Pay")}
                </span>
            </button>

            {/* Show any error that happens when processing the payment */}
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}

            {/* Show a success message upon completion */}
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, see the result in your.
            </p>
        </form>
    );
}



export default withRouter(PaymentForm);