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



class Join extends React.Component {

    /** PROPERTIES */
    state = {
        isJoining: false,
        backgroundImageUrl: BsCore.pubPhotoUrl + "background-8.jpg",
        email: BsAppLocalStorage.get("email") ?? '',
        passwordForCreateAccount: "",
        repeatedPassword: "",
        passwordForSignIn: ""
    };



    /** HELPER-FUNCS */
    doPostOnRegisterProcess = () => {
        Bs.log("TODO: METHOD: doPostOnRegisterProcess()");
    };



    doActualOnRegisterProcess() {
        //ish
        const data = {
            email: this.state.email,
            password: this.state.passwordForCreateAccount,
            doPostProcessCallBack: this.doPostOnRegisterProcess
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

        // ish
        // this.setState({ isJoining: true });
        return true;
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
        if (BsAppLocalStorage.get("isLoggedIn")) { this.props.history.push("/"); }
    }



    componentDidUpdate() {
        if (this.props.isThereJoinError) {
            alert(this.props.errorMsg);
            this.props.resetErrors();
        }

        if (this.props.shouldRedirectHome) {

            // This means the user successfully signed-up.
            Bs.log("shouldRedirectHome");

            // Refresh the cart.
            this.props.showCart();

            this.props.onRedirectHomeSuccess();

            // 
            const redirectTo = this.getRedirectToUrl();
            this.props.history.push(redirectTo);
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
                                    onCredentialChanged={this.onCredentialChanged}
                                    onLogin={this.onLogin} />
                                <CreateAccount email={this.state.email}
                                    onCredentialChanged={this.onCredentialChanged}
                                    onRegister={this.onRegister} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );

    }



    /** EVENT-FUNCS */
    onRegister = (e) => {
        if (this.doPreOnRegisterProcess(e)) {
            this.doActualOnRegisterProcess();
        }
        //ish
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
        isThereJoinError: state.join.isThereJoinError,
        errorMsg: state.join.errorMsg,
        shouldRedirectHome: state.join.shouldRedirectHome
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        onRedirectHomeSuccess: () => dispatch(actions.onRedirectHomeSuccess()),
        showCart: () => dispatch(showCart()),
        saveUser: (data) => dispatch(actions.saveUser(data)),
        login: (credentials) => dispatch(actions.login(credentials)),
        resetErrors: () => dispatch(actions.resetErrors())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Join));