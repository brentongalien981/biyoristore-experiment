import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import { setPaymentFinalizationPageEntryCode, finalizeOrder, resetFinalizationObjs } from '../../actions/checkout';
import { COMPANY_CUSTOMER_SERVICE_EMAIL } from '../../bs-library/constants/global';
import { PAYMENT_FINALIZATION_NAV_BLOCKER_MSG } from './constants/consts';
import BsJLS from '../../bs-library/helpers/BsJLS';
import { BLANK_ADDRESS } from '../checkout/constants/consts';



class PaymentFinalization extends React.Component {

    /* PROPERTIES */
    static ARE_PAGE_DATA_REQUIREMENTS_VALID = false;
    static unblockNavBlocker = null;
    static isPaymentFinalizationProcessing = false;



    /* HELPER FUNCS */
    checkPageEntryCode() {

        Bs.log("\n\n##############################");
        Bs.log("In METHOD: checkPageEntryCode()...");

        const passedState = this.props.location.state;
        Bs.log("\nthis.props.location.state ==> ...");
        Bs.log(this.props.location.state);

        if (passedState) {

            // Check if loading this webpage is coming from the checkout-page's 
            // order-details confirmation.
            const actualPageEntryCode = this.props.paymentFinalizationPageEntryCode;
            const passedPageEntryCode = passedState.paymentFinalizationPageEntryCode;

            if (!actualPageEntryCode || actualPageEntryCode === "" ||
                !passedPageEntryCode || passedPageEntryCode === "" ||
                actualPageEntryCode !== passedPageEntryCode) {
                return false;
            }


            Bs.log("\nthis.props.paymentFinalizationPageEntryCode ==> " + this.props.paymentFinalizationPageEntryCode);
            Bs.log("this.props.location.state.paymentFinalizationPageEntryCode ==> " + this.props.location.state.paymentFinalizationPageEntryCode);

            return true;

        }

        return false;
    }



    enableNavBlocker() {
        // 2 WARNINGS: Warn user from moving away from the page when pay-process has already been dispatched.
        PaymentFinalization.unblockNavBlocker = this.props.history.block(() => {
            alert(PAYMENT_FINALIZATION_NAV_BLOCKER_MSG);
            return false;
        });
    }



    doPrePaymentFinalizationProcess() {
        if (!PaymentFinalization.ARE_PAGE_DATA_REQUIREMENTS_VALID) { return false; }

        if (PaymentFinalization.isPaymentFinalizationProcessing) {
            alert("Please wait. We're finalizing your order.");
            return false;
        }

        PaymentFinalization.isPaymentFinalizationProcessing = true;

        this.enableNavBlocker();
        return true;
    }


    
    doActualPaymentFinalizationProcess() {
        const data = {
            cartId: this.props.location.state.cartId,
            shippingInfo: this.props.location.state.shippingInfo,
            doCallBackFunc: this.doPostPaymentFinalizationProcess
        };
        this.props.finalizeOrder(data);
    }


    
    doPostPaymentFinalizationProcess() {
        PaymentFinalization.unblockNavBlocker();
        PaymentFinalization.isPaymentFinalizationProcessing = false;

        BsJLS.set('checkout.inputAddress', BLANK_ADDRESS);
    }



    getMsgComponent() {

        let msgHeader = "";
        let msgBody = "";
        let orderLink = null;


        switch (this.props.orderProcessStatusCode) {
            case 0:
                msgBody = "Please wait. We're finalizing your order.";
                break;
            default:
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
        }

        return (
            <>
                <h1 className="mb-2">{msgHeader}</h1>
                <p>{msgBody}</p>
            </>
        );
    }



    /** MAIN FUNCS */
    componentDidMount() {
        if (!this.doPrePaymentFinalizationProcess()) { return; }
        this.doActualPaymentFinalizationProcess();
    }



    componentWillUnmount() {
        Bs.log("\n\n##############################");
        Bs.log("In CLASS: PaymentFinalization, METHOD: componentWillUnmount()...");

        if (PaymentFinalization.isPaymentFinalizationProcessing) {
            alert(PAYMENT_FINALIZATION_NAV_BLOCKER_MSG);
            return;
        }

        this.props.setPaymentFinalizationPageEntryCode();

        if (PaymentFinalization.unblockNavBlocker?.()) { }
        
    }



    constructor(props) {
        super(props);
        Bs.log("\n\n##############################");
        Bs.log("In CLASS: PaymentFinalization, METHOD: constructor()...");

        PaymentFinalization.ARE_PAGE_DATA_REQUIREMENTS_VALID = false;
        PaymentFinalization.isPaymentFinalizationProcessing = false;

        if (!this.checkPageEntryCode()) {
            alert("Please confirm your order details first");
            this.props.history.replace("/checkout");
            return;
        }

        PaymentFinalization.ARE_PAGE_DATA_REQUIREMENTS_VALID = true;
        this.props.resetFinalizationObjs();
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
        orderProcessStatusCode: state.checkout.orderProcessStatusCode,
        paymentFinalizationPageEntryCode: state.checkout.paymentFinalizationPageEntryCode,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        resetFinalizationObjs: () => dispatch(resetFinalizationObjs()),
        finalizeOrder: (data) => dispatch(finalizeOrder(data)),
        setPaymentFinalizationPageEntryCode: () => dispatch(setPaymentFinalizationPageEntryCode()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PaymentFinalization));