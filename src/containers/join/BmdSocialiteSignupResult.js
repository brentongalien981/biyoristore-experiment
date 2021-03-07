import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import * as actions from '../../actions/join';
import TemporaryAlertSystem from '../../components/temporary-alert-system/TemporaryAlertSystem';
import BsAppLocalStorage from '../../bs-library/helpers/BsAppLocalStorage';
import { queueAlert } from '../../actions/temporaryAlerts';
import { showCart } from '../../actions/cart';

class BmdSocialiteSignupResult extends React.Component {

    /** PROPERTIES */
    static unblockNavBlocker = null;



    /** HELPER FUNCS */
    doOnVerifyAuthDataCallBack = () => {
        this.props.history.replace('join');
    };



    doPostVerifyAuthDataProcess() {
        BmdSocialiteSignupResult.unblockNavBlocker();
    }



    doActualVerifyAuthDataProcess() {

        const urlParams = this.props.history.location.search;
        const acceptedParamKeys = [
            'email',
            'bmdToken',
            'refreshToken',
            'expiresIn',
            'authProviderId',
            // 'customError',
            // 'exception'
        ];

        const parsedParams = Bs.getParsedQueryParams(urlParams, acceptedParamKeys);


        // TODO:DELETE
        Bs.log('parsedParams ==> ...');
        Bs.log(parsedParams);


        const data = {
            ...parsedParams,
            doPostProcessCallBack: this.doPostVerifyAuthDataProcess,
            doOnReturnFailCallBack: this.doOnVerifyAuthDataCallBack,
        };

        this.props.verifyAuthData(data);
    }



    doPreVerifyAuthDataProcess() {
        this.enableNavBlocker();
    }



    verifyAuthData() {
        this.doPreVerifyAuthDataProcess();
        this.doActualVerifyAuthDataProcess();
    }




    enableNavBlocker() {
        // 2 WARNINGS: Warn user from moving away from the page when the process has already been dispatched.
        BmdSocialiteSignupResult.unblockNavBlocker = this.props.history.block(() => {
            alert("Please wait, we're creating your account...");
            return false;
        });
    }



    doOnRegisterProcessFinalization() {

        // Show message to user.
        const email = BsAppLocalStorage.get('email');
        const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: "Sign-up successful. Welcome " + email+ "!" });
        this.props.queueAlert(newAlertObj);

        // Refresh the cart.
        this.props.showCart();

        const redirectTo = this.getRedirectToUrl();
        this.props.history.replace(redirectTo);
    }



    getRedirectToUrl() {
        const acceptedUrlParams = ["redirectTo"];
        const urlQuery = this.props.location.search;
        const parsedQueryParams = Bs.getParsedQueryParams(urlQuery, acceptedUrlParams);
        let redirectToUrl = "/";
        redirectToUrl += parsedQueryParams["redirectTo"] ? parsedQueryParams["redirectTo"] : "";
        return redirectToUrl;
    }



    /** MAIN FUNCS */
    componentDidUpdate() {
        if (this.props.shouldDoOnRegisterProcessFinalization) {
            this.doOnRegisterProcessFinalization();
        }
    }



    componentDidMount() {
        if (BsAppLocalStorage.isLoggedIn()) {
            this.props.history.replace("/");
            return;
        }
        
        this.verifyAuthData();
    }



    render() {
        return (
            <div style={{ marginTop: '100px' }}>
                <h6>Please wait. We're creating your account...</h6>
                <div style={{ marginTop: '500px' }}></div>
            </div>
        );
    }
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        shouldDoOnRegisterProcessFinalization: state.join.shouldDoOnRegisterProcessFinalization,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        showCart: () => dispatch(showCart()),
        verifyAuthData: (data) => dispatch(actions.verifyAuthData(data)),
        queueAlert: (obj) => dispatch(queueAlert(obj)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BmdSocialiteSignupResult));


