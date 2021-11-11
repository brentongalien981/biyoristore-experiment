import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Bs from '../../bs-library/helpers/Bs';
import BsAppLocalStorage from '../../bs-library/helpers/BsAppLocalStorage';
import * as actions from '../../actions/join';
import TemporaryAlertSystem from '../../components/temporary-alert-system/TemporaryAlertSystem';
import { queueAlert } from '../../actions/temporaryAlerts';


class BmdSocialiteLoginResult extends React.Component {

    /** CONSTS */
    static AUTH_RESULT_FOR_OK_SOCIALITE_LOGIN = 4;
    static AUTH_RESULT_FOR_FAIL_SOCIALITE_LOGIN = 5;

    /** PROPERTIES */
    static unblockNavBlocker = null;



    /** HELPER FUNCS */
    doPostLoginProcess = (isProcessSuccessful) => {
        BmdSocialiteLoginResult.unblockNavBlocker();

        if (!isProcessSuccessful) {
            this.props.history.replace('/join');
        }
    };



    doActualLoginProcess() {

        const urlParams = this.props.history.location.search;
        const acceptedParamKeys = [
            'authResult',
            'email',
            'bmdToken',
            'bmdRefreshToken',
            'expiresIn',
            'authProviderId',
            'overallProcessLogs',
            'caughtCustomError',
            'stayLoggedIn',
            'resultCode'
            // 'exception'
        ];

        const parsedParams = Bs.getParsedQueryParams(urlParams, acceptedParamKeys);


        let callBackData = {
            ...parsedParams,
            objs: {...parsedParams},
            doPostProcessCallBack: this.doPostLoginProcess,
        };



        if (parsedParams['authResult'] == BmdSocialiteLoginResult.AUTH_RESULT_FOR_OK_SOCIALITE_LOGIN) {
            callBackData = { ...callBackData, isResultOk: true };
            this.props.onLoginSuccess(callBackData);
        } else {
            this.props.onLoginFail(callBackData);
        }

    }



    doPreLoginProcess() {
        this.enableNavBlocker();
    }



    login() {
        this.doPreLoginProcess();
        this.doActualLoginProcess();
    }



    enableNavBlocker() {
        // NOTE: Warn user from moving away from the page when the process has already been dispatched.
        BmdSocialiteLoginResult.unblockNavBlocker = this.props.history.block(() => {
            alert("Please wait, we're setting up your account...");
            return false;
        });
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
        if (this.props.shouldDoOnLoginProcessFinalization) {

            // Show message to user.
            let msg = 'Welcome back!';
            const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: msg });
            this.props.queueAlert(newAlertObj);


            const redirectTo = this.getRedirectToUrl();
            this.props.history.replace(redirectTo);

        }
    }



    componentDidMount() {
        if (BsAppLocalStorage.isLoggedIn()) {
            this.props.history.replace("/");
            return;
        }

        this.login();
    }



    render() {
        return (
            <div className="container" style={{ marginTop: '100px' }}>
                <h6>Working on it...</h6>
                <div style={{ marginTop: '500px' }}></div>
            </div>
        );
    }



    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        shouldDoOnLoginProcessFinalization: state.join.shouldDoOnLoginProcessFinalization,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        queueAlert: (obj) => dispatch(queueAlert(obj)),
        onLoginSuccess: (callBackData) => dispatch(actions.onLoginSuccess(callBackData)),
        onLoginFail: (callBackData) => dispatch(actions.onLoginFail(callBackData)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BmdSocialiteLoginResult));