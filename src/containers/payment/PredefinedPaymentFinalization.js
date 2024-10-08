import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions/checkout';
import { COMPANY_CUSTOMER_SERVICE_EMAIL } from '../../bs-library/constants/global';
import BsJLS from '../../bs-library/helpers/BsJLS';
import { BLANK_ADDRESS } from '../checkout/constants/consts';
import { getProjectedTotalDeliveryDays } from '../checkout/helper-funcs/HelperFuncsA';
import { ORDER_STATUSES, PAYMENT_FINALIZATION_NAV_BLOCKER_MSG } from './constants/consts';



class PredefinedPaymentFinalization extends React.Component {

    /* PROPERTIES */
    // static ARE_PAGE_DATA_REQUIREMENTS_VALID = false;
    static unblockNavBlocker = null;
    static isPredefinedPaymentFinalizationProcessing = false;



    /* HELPER FUNCS */
    getCartItemsInfo() {
        const cartItems = this.props.location.state.cartItems;
        let info = [];

        cartItems.forEach(i => {
            const item = { id: i.id, productId: i.product.id, quantity: i.quantity };
            info.push(item);
        });

        return info;
    }



    doActualPredefinedPaymentFinalizationProcess() {
        const data = {
            paymentMethodId: this.props.location.state.paymentMethodId,
            shippingInfo: this.props.location.state.shippingInfo,
            cartItemsInfo: this.getCartItemsInfo(),
            shipmentRateAmount: this.props.shipmentRate.rate,
            projectedTotalDeliveryDays: getProjectedTotalDeliveryDays(this.props.cart.cartItems, this.props.shipmentRate),
            doCallBackFunc: () => {
                PredefinedPaymentFinalization.unblockNavBlocker();
                PredefinedPaymentFinalization.isPredefinedPaymentFinalizationProcessing = false;

                BsJLS.set('checkout.inputAddress', BLANK_ADDRESS);
            }
        };

        this.props.finalizeOrderWithPredefinedPayment(data);
    }



    enableNavBlocker() {
        // 2 WARNINGS: Warn user from moving away from the page when pay-process has already been dispatched.
        PredefinedPaymentFinalization.unblockNavBlocker = this.props.history.block(() => {
            alert(PAYMENT_FINALIZATION_NAV_BLOCKER_MSG);
            return false;
        });
        // window.onbeforeunload = () => { return "Please wait we're processing your payment. \nIf you wanna cancel your order, please contact customer service at \ncustomerservice@anyshotbasketball.com"; };
    }



    doPrePredefinedPaymentFinalizationProcess() {

        if (PredefinedPaymentFinalization.isPredefinedPaymentFinalizationProcessing) {
            alert("Please wait. We're finalizing your order.");
            return false;
        }

        PredefinedPaymentFinalization.isPredefinedPaymentFinalizationProcessing = true;

        this.enableNavBlocker();
        return true;
    }


    
    getMsgComponent() {

        let msgHeader = "";
        let msgBody = "";
        let orderLink = null;


        switch (this.props.paymentProcessStatusCode) {
            case ORDER_STATUSES.PAYMENT_METHOD_NOT_CHARGED:
                msgHeader = "Oops, sorry...";
                msgBody = (
                    <>
                        We couldn't process your payment. Your payment was not charged.<br />
                        <Link to="/checkout">Please try again.</Link><br />
                    </>
                );
                break;
            case 0:
                msgHeader = "Please wait...";
                msgBody = "Please wait. We're finalizing your order.";
                break;
            case ORDER_STATUSES.PAYMENT_METHOD_CHARGED:
                msgHeader = "Payment Successful!";

                if (this.props.orderId != 0) {
                    const orderUrl = '/order?id=' + this.props.orderId;
                    orderLink = (<Link to={orderUrl} style={{color: 'blue'}}>You can also view it here.</Link>);
                }

                msgBody = (
                    <>
                        We've received your payment and now processing your order.<br />
                        We've emailed you the order details for your copy. {orderLink}<br /><br />
                        If you have any questions or want to cancel your order before it's shipped,<br />
                        please contact our Customer Service at <b style={{ color: "green" }}>{COMPANY_CUSTOMER_SERVICE_EMAIL}</b>
                    </>
                );
                break;
            default:
                msgHeader = "Oops, sorry...";
                msgBody = "Something went wrong on our end. Please try again shortly";
                break;
        }


        return (
            <>
                <h1 className="mb-2">{msgHeader}</h1>
                <p>{msgBody}</p>
            </>
        );
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
        if (PredefinedPaymentFinalization.isPredefinedPaymentFinalizationProcessing) {
            alert(PAYMENT_FINALIZATION_NAV_BLOCKER_MSG);
            return;
        }

        this.props.setPredefinedPaymentFinalizationPageEntryCode();
    }



    componentDidMount() {
        
        if (!this.checkPageEntryCode()) { 
            alert("Please confirm your order first.");
            this.props.history.replace("/checkout");
            return; 
        }

        this.props.resetFinalizationObjs();

        if (!this.doPrePredefinedPaymentFinalizationProcess()) { return; }

        this.doActualPredefinedPaymentFinalizationProcess();
    }


    
    render() {
        
        let msgComponent = this.getMsgComponent();

        return (
            <section className="hero" style={{ paddingTop: "200px", paddingBottom: "300px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {msgComponent}
                        </div>
                    </div>

                </div>
            </section>
        );
    }



    /* EVENT FUNCS */
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        orderId: state.checkout.orderId,
        shipmentRate: state.checkout.shipmentRate,
        cart: state.cart.cart,
        paymentProcessStatusCode: state.checkout.paymentProcessStatusCode,
        orderProcessStatusCode: state.checkout.orderProcessStatusCode,
        actualPageEntryCode: state.checkout.predefinedPaymentFinalizationPageEntryCode,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        setPredefinedPaymentFinalizationPageEntryCode: () => dispatch(actions.setPredefinedPaymentFinalizationPageEntryCode()),
        finalizeOrderWithPredefinedPayment: (data) => dispatch(actions.finalizeOrderWithPredefinedPayment(data)),
        resetFinalizationObjs: () => dispatch(actions.resetFinalizationObjs()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PredefinedPaymentFinalization));