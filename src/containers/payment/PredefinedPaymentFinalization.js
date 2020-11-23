import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';



class PredefinedPaymentFinalization extends React.Component {

    /* PROPERTIES */
    // static ARE_PAGE_DATA_REQUIREMENTS_VALID = false;
    static unblockNavBlocker = null;
    // static isPaymentFinalizationProcessing = false;



    /* HELPER FUNCS */
    checkPageEntryCode() {

        const passedState = this.props.location.state;

        if (passedState) {
            //ish
            // Check if loading this webpage is coming from the checkout-page's 
            // order-details confirmation.
            const actualPageEntryCode = this.props.paymentFinalizationPageEntryCode;
            const passedPageEntryCode = passedState.paymentFinalizationPageEntryCode;

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
    componentDidMount() {
        //ish
        return;
        if (!this.checkPageEntryCode()) { 
            this.props.history.replace("/checkout");
            return; 
        }
    }


    
    render() {
        return null;
    }



    /* EVENT FUNCS */
}



/* REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        // orderProcessStatusCode: state.checkout.orderProcessStatusCode,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        // endPaymentFinalizationProcess: () => dispatch(endPaymentFinalizationProcess()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PredefinedPaymentFinalization));