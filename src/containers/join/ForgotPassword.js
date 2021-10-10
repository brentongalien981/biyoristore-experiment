import React from 'react';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import BlankSpacer from '../../components/customized-spacers/BlankSpacer';
import ForgotPasswordContent from './ForgotPasswordContent';
import BsAppLocalStorage from '../../bs-library/helpers/BsAppLocalStorage';
import Bs from '../../bs-library/helpers/Bs';
import { connect } from 'react-redux';
import { emailUserResetLink } from '../../actions/join';
import BmdAuth from '../../bs-library/core/BmdAuth';
import { withRouter } from 'react-router';



class ForgotPassword extends React.Component {

    state = {
        email: BsAppLocalStorage.get('email') ?? '',
        backgroundImageUrl: BsCore2.pubPhotoUrl + "background-8.jpg",
        isRequestingForResetLinkEmail: false
    };



    componentDidMount() {
        if (BmdAuth.isLoggedIn()) {
            this.props.history.replace("/");
            return;
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
                            <div className="accordion accordion-portal" id="forgotPasswordAccordion">
                                <ForgotPasswordContent
                                    email={this.state.email}
                                    onCredentialChanged={this.onCredentialChanged}
                                    onEmailUserResetLink={this.onEmailUserResetLink}
                                    isRequestingForResetLinkEmail={this.state.isRequestingForResetLinkEmail}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }



    onEmailUserResetLink = (e) => {
        e.preventDefault();

        if (this.state.isRequestingForResetLinkEmail) { return; }

        this.setState({ isRequestingForResetLinkEmail: true });


        const data = {
            params: {
                email: this.state.email
            },

            doCallBackFunc: (objs) => {
                this.setState({ isRequestingForResetLinkEmail: false });
            }
        };


        this.props.emailUserResetLink(data);
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
    };
}



/** REACT-FUNCS */
const mapDispatchToProps = (dispatch) => {
    return {
        emailUserResetLink: (data) => dispatch(emailUserResetLink(data)),
    };
};



export default connect(null, mapDispatchToProps)(withRouter(ForgotPassword));