import React from 'react';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import BsCore from '../../bs-library/helpers/BsCore';
import { connect } from 'react-redux';
import * as actions from '../../actions/join';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import Bs from '../../bs-library/helpers/Bs';



class Join extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundImageUrl: BsCore.pubPhotoUrl + "background-8.jpg",
            email: BsAppSession.get("email"), passwordForCreateAccount: "", repeatedPassword: ""
        };
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
                                <SignIn />
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



const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (credentials) => dispatch(actions.saveUser(credentials))
    };
};



export default connect(null, mapDispatchToProps)(Join);