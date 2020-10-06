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



class Join extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundImageUrl: BsCore.pubPhotoUrl + "background-8.jpg",
            email: BsAppSession.get("email"), passwordForCreateAccount: "", repeatedPassword: "", passwordForSignIn: ""
        };

        if (BsAppSession.get("isLoggedIn") == 1) { this.props.history.push("/"); }
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
            
            this.props.history.push("/");
        }
    }



    onRegister = (e) => {
        e.preventDefault();

        // Check passwords.
        if (this.state.passwordForCreateAccount !== this.state.repeatedPassword) {
            alert("Passwords don't match...");
            return;
        }


        const credentials = {
            email: this.state.email,
            password: this.state.passwordForCreateAccount
        };

        this.props.saveUser(credentials);
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
            BsAppSession.set("email", value);
        }

        this.setState({
            [name]: value
        });
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
}




const mapStateToProps = (state) => {
    return {
        isThereJoinError: state.join.isThereJoinError,
        errorMsg: state.join.errorMsg,
        shouldRedirectHome: state.join.shouldRedirectHome
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        showCart: () => dispatch(showCart()),
        saveUser: (credentials) => dispatch(actions.saveUser(credentials)),
        login: (credentials) => dispatch(actions.login(credentials)),
        resetErrors: () => dispatch(actions.resetErrors())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Join));