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
import PaymentModal from './PaymentModal';
import PaymentForm from './PaymentForm';
import Addresses from './Addresses';
import AddressForm from './AddressForm';



class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            newPayment: { cardNumber: "", nameOnCard: "", expirationMonth: "11", expirationYear: "2020" },
            paymentFormCrudMethod: "create",
            editedAddress: { street: "", city: "", province: "ON", country: "Canada", postalCode: "" },
            addressFormCrudMethod: "create"
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
            this.setState({ newPayment: { cardNumber: "", nameOnCard: "", expirationMonth: "11", expirationYear: "2020" } });

            this.props.onPaymentFormResetSuccess();
        }

        if (this.props.shouldResetAddressForm) {
            this.setState({ editedAddress: { street: "", city: "", province: "ON", country: "Canada", postalCode: "" } });

            this.props.onAddressFormResetSuccess();
        }
        //ish
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

        let newPayment = this.state.newPayment;
        newPayment.expirationMonth = parseInt(newPayment.expirationMonth);
        newPayment.expirationYear = parseInt(newPayment.expirationYear);
        this.setState({ newPayment: newPayment });
        this.props.savePayment(this.state.newPayment, this.state.paymentFormCrudMethod);
    };



    saveAddress = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.saveAddress(this.state.editedAddress, this.state.addressFormCrudMethod);
    };



    onAddressFormInputChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedEditedAddress = this.state.editedAddress;
        updatedEditedAddress[name] = value;
        this.setState({ editedAddress: updatedEditedAddress });
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



    onPaymenFormShown = (e, payment) => {
        e.preventDefault();
        Bs.log("payment ==> ...");
        Bs.log(payment);

        if (payment) {
            // edit payment
            this.setState({
                newPayment: payment,
                paymentFormCrudMethod: "edit"
            });
        } else {
            // create payment
            this.setState({
                newPayment: { cardNumber: "", nameOnCard: "", expirationMonth: "11", expirationYear: "2020" },
                paymentFormCrudMethod: "create"
            });
        }
        // ish
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
                                            <Addresses addresses={this.props.addresses} />
                                            <Payments paymentInfos={this.props.paymentInfos} onPaymenFormShown={this.onPaymenFormShown} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <AddressForm addressFormCrudMethod={this.state.addressFormCrudMethod}
                    address={this.state.editedAddress}
                    onAddressFormInputChanged={this.onAddressFormInputChanged}
                    saveAddress={this.saveAddress} />

                <PaymentForm paymentFormCrudMethod={this.state.paymentFormCrudMethod}
                    newPayment={this.state.newPayment}
                    onPaymentFormInputChanged={this.onPaymentFormInputChanged}
                    savePayment={this.savePayment} />
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
        addresses: state.profile.addresses,
        shouldResetAddressForm: state.profile.shouldResetAddressForm,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        readProfile: (userId) => dispatch(actions.readProfile(userId)),
        onProfileDisplayedSuccess: () => dispatch(actions.onProfileDisplayedSuccess()),
        saveProfile: (profile) => dispatch(actions.saveProfile(profile)),
        savePayment: (newPayment, paymentForCrudMethod) => dispatch(actions.savePayment(newPayment, paymentForCrudMethod)),
        onPaymentFormResetSuccess: () => dispatch(actions.onPaymentFormResetSuccess()),
        saveAddress: (address, addressFormCrudMethod) => dispatch(actions.saveAddress(address, addressFormCrudMethod)),
        onAddressFormResetSuccess: () => dispatch(actions.onAddressFormResetSuccess()),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));