import React from 'react';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import { connect } from 'react-redux';
import { updatePassword } from '../../actions/join';
import BmdAuth from '../../bs-library/core/BmdAuth';
import { withRouter } from 'react-router';
import WaitLoader from '../../components/loader/WaitLoader';
import Bs from '../../bs-library/helpers/Bs';
import { queueAlert } from '../../actions/temporaryAlerts';
import TemporaryAlertSystem from '../../components/temporary-alert-system/TemporaryAlertSystem';



class PasswordReset extends React.Component {

    state = {
        backgroundImageUrl: BsCore2.pubPhotoUrl + "background-8.jpg",
        password: '',
        verifyPassword: '',
        isUpdatingPassword: false
    };



    componentDidMount() {
        if (BmdAuth.isLoggedIn()) {
            this.props.history.replace("/");
            return;
        }
    }



    componentDidUpdate() {
        if (this.props.shouldDoOnLoginProcessFinalization) {

            // Show message to user.
            let msg = 'Password Reset Successful!';
            const newAlertObj = TemporaryAlertSystem.createAlertObj({ msg: msg });
            this.props.queueAlert(newAlertObj);

            this.props.history.replace('/');

        }
    }


    render() {

        const styleAttribVal = {
            backgroundImage: "url(" + this.state.backgroundImageUrl + ")"
        };

        const cardStyle = {
            backgroundColor: 'white'
        };



        let actualContent = (
            <div className="row">

                <div className="form-group col-12">
                    <label htmlFor="password">New Password</label>
                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={(e) => this.onCredentialChanged(e)} />
                </div>

                <div className="form-group col-12">
                    <label htmlFor="verifyPassword">Verify New Password</label>
                    <input type="password" className="form-control" name="verifyPassword" value={this.state.verifyPassword} onChange={(e) => this.onCredentialChanged(e)} />
                </div>

                <div className="col-12 mt-2">
                    <a href="#!" className="btn btn-block btn-primary" onClick={(e) => this.onPasswordUpdate(e)}>update password</a>
                </div>

            </div>
        );


        if (this.state.isUpdatingPassword) {
            actualContent = (<WaitLoader size="md" />);
        }


        return (
            <section className="py-md-0">
                <div className="image image-overlay" style={styleAttribVal}></div>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-md-100">
                        <div className="col-md-10 col-lg-5">

                            <div className="card" style={cardStyle}>

                                <div className="card-header">
                                    <h5 className="my-1">Reset Password</h5>
                                </div>

                                <div className="card-body">
                                    {actualContent}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }



    getResetToken = () => {
        const urlParams = this.props.location.search;
        const acceptedParams = ['t'];
        const parsedUrlParams = Bs.getParsedQueryParams(urlParams, acceptedParams);
        return parsedUrlParams['t'];
    };



    onPasswordUpdate = (e) => {
        e.preventDefault();

        if (this.state.isUpdatingPassword) { return; }
        if (this.state.password !== this.state.verifyPassword) {
            alert('Passwords do not match.');
            return;
        }

        this.setState({ isUpdatingPassword: true });


        const data = {
            params: {
                resetToken: this.getResetToken(),
                password: this.state.password
            },

            doCallBackFunc: (objs) => {
                this.setState({
                    isUpdatingPassword: false,
                    password: (objs.isResultOk ? '' : this.state.password),
                    verifyPassword: (objs.isResultOk ? '' : this.state.verifyPassword)
                });
            }
        };


        this.props.updatePassword(data);
    };



    onCredentialChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        shouldDoOnLoginProcessFinalization: state.join.shouldDoOnLoginProcessFinalization
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (data) => dispatch(updatePassword(data)),
        queueAlert: (obj) => dispatch(queueAlert(obj)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordReset));