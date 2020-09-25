import React from 'react';
import PersonalData from './PersonalData';
import ProfileBanner from './ProfileBanner';
import ProfileSideBar from './ProfileSideBar';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/profile';
import Bs from '../../bs-library/helpers/Bs';
import Payments from './Payments';



class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            newPayment: { cardNumber: "", nameOnCard: "", expirationMonth: "11", expirationYear: "2020" }
        };

        if (BsAppSession.get("isLoggedIn") == 0) { this.props.history.push("/"); }
    }



    componentDidMount() {
        this.props.readProfile(BsAppSession.get("userId"));
    }



    componentDidUpdate() {
        if (this.props.shouldDisplayProfile) {
            this.setState({
                profile: this.props.profile
            });

            this.props.onProfileDisplayedSuccess();
        }

        if (this.props.shouldResetPaymentForm) {
            this.setState({ newPayment: { cardNumber: "", nameOnCard: "", expirationMonth: "11", expirationYear: "2020" }});

            this.props.onPaymentFormResetSuccess();
        }
    }



    onPersonalDataChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedProfile = this.state.profile;
        updatedProfile[name] = value;

        this.setState({ profile: updatedProfile });
    }



    saveProfile = (e) => {
        e.preventDefault();
        this.props.saveProfile(this.state.profile);
    };



    savePayment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.savePayment(this.state.newPayment);
    };



    onPaymentFormInputChanged = (e) => {
        Bs.log("\n####################");
        Bs.log("In METHOD: onPaymentFormInputChanged()");

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedNewPayment = this.state.newPayment;
        updatedNewPayment[name] = value;
        this.setState({ newPayment: updatedNewPayment });
    };



    render() {
        return (
            <>
                <ProfileBanner profile={this.state.profile} />

                <section className="pt-5">
                    <div className="container">
                        <div className="row gutter-4 justify-content-between">

                            <ProfileSideBar />

                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col">
                                        <div className="tab-content" id="myTabContent">
                                            <PersonalData profile={this.state.profile} onPersonalDataChanged={this.onPersonalDataChanged} saveProfile={this.saveProfile} />

                                            <Payments paymentInfos={this.props.paymentInfos}
                                                newPayment={this.state.newPayment}
                                                onPaymentFormInputChanged={this.onPaymentFormInputChanged}
                                                savePayment={this.savePayment} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        shouldDisplayProfile: state.profile.shouldDisplayProfile,
        paymentInfos: state.profile.paymentInfos,
        shouldResetPaymentForm: state.profile.shouldResetPaymentForm,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProfile: (userId) => dispatch(actions.readProfile(userId)),
        onProfileDisplayedSuccess: () => dispatch(actions.onProfileDisplayedSuccess()),
        saveProfile: (profile) => dispatch(actions.saveProfile(profile)),
        savePayment: (newPayment) => dispatch(actions.savePayment(newPayment)),
        onPaymentFormResetSuccess: () => dispatch(actions.onPaymentFormResetSuccess()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));