import React from 'react';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import BsCore from '../../bs-library/helpers/BsCore';
import { connect } from 'react-redux';
import * as actions from '../../actions/join';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import Bs from '../../bs-library/helpers/Bs';
import { withRouter } from 'react-router-dom';
import { showCart } from '../../actions/cart';
import BsAppLocalStorage from '../../bs-library/helpers/BsAppLocalStorage';
import WaitLoader from '../../components/loader/WaitLoader';
import TemporaryAlertSystem from '../../components/temporary-alert-system/TemporaryAlertSystem';
import { queueAlert } from '../../actions/temporaryAlerts';
import BsCore2 from '../../bs-library/helpers/BsCore2';



class Join extends React.Component {

    /** PROPERTIES */
    static unblockNavBlocker = null;

    state = {
        isJoining: false,
        backgroundImageUrl: BsCore.pubPhotoUrl + "background-8.jpg",
        email: BsAppLocalStorage.get("email") ?? '',
        passwordForCreateAccount: "",
        repeatedPassword: "",
        passwordForSignIn: "",
    };



    /** HELPER-FUNCS */
    doPostOnRegisterProcess = () => {
        Join.unblockNavBlocker();
        this.setState({
            isJoining: false,
            passwordForCreateAccount: '',
            repeatedPassword: '',
            passwordForSignIn: '',
        });
    };



    doActualOnRegisterProcess() {
        const data = {
            email: this.state.email,
            password: this.state.passwordForCreateAccount,
            doPostProcessCallBack: this.doPostOnRegisterProcess,
        };

        this.props.saveUser(data);
    }


    doPreOnRegisterProcess(e) {
        e.preventDefault();

        if (this.state.isJoining) { return false; }

        // Check passwords.
        if (this.state.passwordForCreateAccount !== this.state.repeatedPassword) {
            alert("Passwords don't match...");
            return false;
        }

        this.setState({ isJoining: true });
        this.enableNavBlocker();
        return true;
    }



    enableNavBlocker() {
        // 2 WARNINGS: Warn user from moving away from the page when the process has already been dispatched.
        Join.unblockNavBlocker = this.props.history.block(() => {
            alert("Please wait, we're creating your account...");
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



    /** MAIN-FUNCS */
    componentDidMount() {
        if (BsAppLocalStorage.isLoggedIn()) {
            this.props.history.replace("/");
            return;
        }
        this.props.resetFlags();
    }



    componentDidUpdate() {
        if (this.props.shouldDoOnRegisterProcessFinalization) {

            // Show message to user.
            const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: "Sign-up successful. Welcome " + this.state.email + "!" });
            this.props.queueAlert(newAlertObj);

            // Refresh the cart.
            this.props.showCart();

            const redirectTo = this.getRedirectToUrl();
            this.props.history.replace(redirectTo);

        }
    }



    render() {

        const styleAttribVal = {
            backgroundImage: "url(" + this.state.backgroundImageUrl + ")"
        };


        return (
            <section className="py-md-0">
                <div className="image image-overlay" style={styleAttribVal}></div>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-md-100">
                        <div className="col-md-10 col-lg-5">
                            <div className="accordion accordion-portal" id="accordionExample">
                                <SignIn email={this.state.email}
                                    onSocialMediaOptionClick={this.onSocialMediaOptionClick}
                                    onCredentialChanged={this.onCredentialChanged}
                                    onLogin={this.onLogin} />

                                <CreateAccount email={this.state.email}
                                    onSocialMediaOptionClick={this.onSocialMediaOptionClick}
                                    onCredentialChanged={this.onCredentialChanged}
                                    onRegister={this.onRegister}
                                    isJoining={this.state.isJoining} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );

    }



    /** EVENT-FUNCS */
    onSocialMediaOptionClick = (e, isForSignup, provider) => {
        e.preventDefault();

        if (this.state.isJoining) { return false; }
        this.setState({ isJoining: true });

        // let redirectLink = 'https://asbdev.com/test-socialite/auth-providers';
        let redirectLink = BsCore2.appBackendUrl + '/bmd-socialite/signup-with-auth-provider';

        if (isForSignup) {
            switch (provider) {
                case 'facebook':
                case 'google':
                    redirectLink += '?provider=' + provider;
                    break;
            }
        }

        window.location.replace(redirectLink);
    };



    onRegister = (e) => {
        if (this.doPreOnRegisterProcess(e)) {
            this.doActualOnRegisterProcess();
        }
    };



    onLogin = (e) => {
        e.preventDefault();

        const credentials = {
            email: this.state.email,
            password: this.state.passwordForSignIn
        };

        this.props.login(credentials);
    };



    onCredentialChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === "email") {
            BsAppLocalStorage.set("email", value);
        }

        this.setState({
            [name]: value
        });
    }

}




/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        shouldDoOnRegisterProcessFinalization: state.join.shouldDoOnRegisterProcessFinalization,
        isThereJoinError: state.join.isThereJoinError,
        errorMsg: state.join.errorMsg,
        shouldRedirectHome: state.join.shouldRedirectHome
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        queueAlert: (obj) => dispatch(queueAlert(obj)),
        resetFlags: () => dispatch(actions.resetFlags()),
        onRedirectHomeSuccess: () => dispatch(actions.onRedirectHomeSuccess()),
        showCart: () => dispatch(showCart()),
        saveUser: (data) => dispatch(actions.saveUser(data)),
        login: (credentials) => dispatch(actions.login(credentials)),
        resetErrors: () => dispatch(actions.resetErrors())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Join));