import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Bs from "../../bs-library/helpers/Bs";
import BsCore2 from "../../bs-library/helpers/BsCore2";
import { withRouter } from "react-router-dom";
import BmdAuth from "../../bs-library/core/BmdAuth";
import { COMPANY_CUSTOMER_SERVICE_EMAIL } from "../../bs-library/constants/global";



function PaymentForm(props) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    
    let unblockNavBlocker = null;
    let navBlockerMsg = 'We are processing your payment. Hold on please...\n';
    navBlockerMsg += "If you want to cancel your order, please contact customer service at \n";
    navBlockerMsg += COMPANY_CUSTOMER_SERVICE_EMAIL;


    
    useEffect(() => {

        // Create PaymentIntent as soon as the page loads
        const bmdAuth = BmdAuth.getInstance();
        BsCore2.ajaxCrud({
            url: '/paymentIntent',
            method: "post",
            params: { 
                bmdToken: bmdAuth?.bmdToken, 
                authProviderId: bmdAuth?.authProviderId,
                temporaryGuestUserId: BmdAuth.getTemporaryGuestUserId(),
                cartId: props.cart.id, 
                cartItemsData: props.cartItemsData, 
                ...props.shippingAddress,
                shipmentRateAmount: props.shipmentRate.rate,
                projectedTotalDeliveryDays: props.projectedTotalDeliveryDays
            },
            neededResponseParams: ["clientSecret"],
            callBackFunc: (requestData, json) => {

                if (!json.isResultOk) {
                    alert("Sorry, there's 3rd party problem on our end. Please try again shortly.");
                    props.history.replace("/checkout");
                    return;
                }


                setClientSecret(json.clientSecret);
            },
            errorCallBackFunc: (errors) => {
                alert("Sorry, there's a problem on our end. Please try again shortly.");
                props.history.replace("/checkout");
                return;
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


    const isPaymentFormPrepared = () => {
        if (!clientSecret || clientSecret == "") { return false; };
        return true;
    };



    const doPrePayProcess = () => {
        if (!isPaymentFormPrepared()) {
            alert("Please wait, we're preparing your payment... Try again in a couple of seconds.");
            return false;
        }
        if (processing) { alert("Please wait we're processing your payment."); return false; }

        setProcessing(true);

        // 2 WARNINGS: Warn user from moving away from the page when pay-process has already been dispatched.
        unblockNavBlocker = props.history.block(() => {
            alert(navBlockerMsg);
            return false;
        });
        

        return true;
    };



    const handleSubmit = async ev => {
        ev.preventDefault();
        if (!doPrePayProcess()) { return; }

        // BMD-TODO: On DEV-ITER-007
        // Do a check in the backend if the cart is still valid (and not been checked-out yet).


        // Process the payment.
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });


        // Do actions after payment results.
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
            unblockNavBlocker();
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            unblockNavBlocker();

            // redirect to page payment-finalization
            const redirectPageDataRequirements = {
                paymentFinalizationPageEntryCode: props.paymentFinalizationPageEntryCode,
                cartId: props.cart.id,
                shippingInfo: props.shippingAddress
            };

            props.history.replace("/payment-finalization", redirectPageDataRequirements);
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
                Payment succeeded, we're now finalizing your order...
            </p>
        </form>
    );
}



export default withRouter(PaymentForm);