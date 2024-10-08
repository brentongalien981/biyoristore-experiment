import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import * as actions from '../../actions/join';
import TemporaryAlertSystem from '../../components/temporary-alert-system/TemporaryAlertSystem';
import BsAppLocalStorage from '../../bs-library/helpers/BsAppLocalStorage';
import { queueAlert } from '../../actions/temporaryAlerts';

class BmdSocialiteSignupResult extends React.Component {

    /** CONSTS */
    static AUTH_RESULT_FOR_EXISTING_SOCIALITE_USER = 1;
    static AUTH_RESULT_FOR_OK_SOCIALITE_SIGNUP = 2;
    static AUTH_RESULT_FOR_FAIL_SOCIALITE_SIGNUP = 3;


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
            'authResult',
            'email',
            'bmdToken',
            'bmdRefreshToken',
            'expiresIn',
            'authProviderId',
            'overallProcessLogs',
            'caughtCustomError'
            // 'exception'
        ];

        const parsedParams = Bs.getParsedQueryParams(urlParams, acceptedParamKeys);


        const data = {
            ...parsedParams,
            doPostProcessCallBack: this.doPostVerifyAuthDataProcess,
            doOnReturnFailCallBack: this.doOnVerifyAuthDataCallBack,
        };


        if (parsedParams['authResult'] == BmdSocialiteSignupResult.AUTH_RESULT_FOR_FAIL_SOCIALITE_SIGNUP) {
            const objs = { ...data };
            this.props.onCreateAccountFail(objs);
        } else {
            this.props.verifyAuthData(data);
        }

    }



    doPreVerifyAuthDataProcess() {
        this.enableNavBlocker();
    }



    verifyAuthData() {
        this.doPreVerifyAuthDataProcess();
        this.doActualVerifyAuthDataProcess();
    }




    enableNavBlocker() {
        // NOTE: Warn user from moving away from the page when the process has already been dispatched.
        BmdSocialiteSignupResult.unblockNavBlocker = this.props.history.block(() => {
            alert("Please wait, we're setting up your account...");
            return false;
        });
    }



    doOnRegisterProcessFinalization() {

        // Show message to user.
        const email = BsAppLocalStorage.get('email');
        const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: "Welcome " + email + "!" });
        this.props.queueAlert(newAlertObj);

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
            <div className="container" style={{ marginTop: '100px' }}>
                <h6>Please wait. We're setting up your account...</h6>
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
        onCreateAccountFail: (objs) => dispatch(actions.onCreateAccountFail(objs)),
        verifyAuthData: (data) => dispatch(actions.verifyAuthData(data)),
        queueAlert: (obj) => dispatch(queueAlert(obj)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BmdSocialiteSignupResult));


