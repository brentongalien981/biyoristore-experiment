import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as cartActions from '../actions/cart';
import { resetFlags } from '../actions/join';
import BmdAuth from '../bs-library/core/BmdAuth';
import * as cartWidgetHelperFuncs from '../components/cart/helper-funcs/HelperFuncsA';



class OnSuccessfulJoin extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */
    //bmd-ish
    mergeGuestAndActualUserCarts = () => {
        const bmdHttpRequestData = cartWidgetHelperFuncs.prepareCartBmdHttpRequestData();

        const data = {
            bmdHttpRequest: bmdHttpRequestData,
            params: {
                ...bmdHttpRequestData.params,
                temporaryGuestUserId: BmdAuth.getTemporaryGuestUserId()
            }
        };

        this.props.mergeGuestAndActualUserCarts(data);
    };



    handleOnSuccessfulLogin = () => {
        this.props.resetFlags();
        this.mergeGuestAndActualUserCarts();
    };



    /** MAIN FUNCS */
    componentDidUpdate() {
        if (this.props.shouldDoOnRegisterProcessFinalization || this.props.shouldDoOnLoginProcessFinalization) {
            this.handleOnSuccessfulLogin();
        }
    }



    render() {
        return null;
    }



    /** EVENT FUNCS */
}



/** REACT-REDUX-PROPS */
const mapStateToProps = (state) => {
    return {
        shouldDoOnRegisterProcessFinalization: state.join.shouldDoOnRegisterProcessFinalization,
        shouldDoOnLoginProcessFinalization: state.join.shouldDoOnLoginProcessFinalization
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        mergeGuestAndActualUserCarts: (data) => dispatch(cartActions.mergeGuestAndActualUserCarts(data)),
        resetFlags: () => dispatch(resetFlags())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OnSuccessfulJoin));