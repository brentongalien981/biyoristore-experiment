import React from 'react';
import PersonalData from './PersonalData';
import ProfileBanner from './ProfileBanner';
import ProfileSideBar from './ProfileSideBar';
import BsAppSession from '../../bs-library/helpers/BsAppSession';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/profile';
import * as myConstants from './constants/consts';
import Bs from '../../bs-library/helpers/Bs';
import Payments from './Payments';
import PaymentModal from './PaymentModal';
import PaymentForm from './PaymentForm';
import Addresses from './Addresses';
import AddressForm from './AddressForm';
import Orders from './Orders';
import BmdAuth from '../../bs-library/core/BmdAuth';
import Account from './Account';
import BsCore2 from '../../bs-library/helpers/BsCore2';
import { checkBmdAuthValidity } from '../../actions/appStateManager';



class Profile extends React.Component {

    state = {
        profile: {},
        newPayment: { cardNumber: "", expirationMonth: "01", expirationYear: "2022", cvc: "", postalCode: "" },
        isPaymentFormCruding: false,
        isSavingAccount: false,
        paymentFormCrudMethod: "create",

        editedAddress: { street: "", city: "", province: "ON", country: "Canada", postalCode: "" },
        addressFormCrudMethod: "create",

        account: {
            email: BmdAuth.getInstance()?.email,
            oldPassword: '',
            newPassword: '',
            newPasswordCopy: '',
        },
    };



    componentDidMount() {
        this.props.checkBmdAuthValidity({ reactRouterHistory: this.props.history });
        this.props.readProfile();
        this.props.readOrders({ pageNum: 1 });
        //ish
    }



    componentDidUpdate() {

        if (this.props.shouldDisplayProfile) {
            this.setState({
                profile: this.props.profile
            });

            this.props.onProfileDisplayedSuccess();
        }


        if (this.props.shouldDoPostSavePayment) { this.doPostSavePayment(); }



        if (this.props.shouldResetAddressForm) {
            this.setState({ editedAddress: { street: "", city: "", province: "ON", country: "Canada", postalCode: "" } });

            this.props.onAddressFormResetSuccess();
        }
    }



    onOrderPageNumClick = (e, pageNum) => {
        e.preventDefault();
        Bs.log("TODO: onOrderPageNumClick()");
        Bs.log("pageNum ==> " + pageNum);

        if (pageNum === this.props.selectedOrderPageNum) { Bs.log("same pageNum..."); return; }
        this.props.readOrders({ pageNum: pageNum });
    };



    onPersonalDataChanged = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedProfile = this.state.profile;
        updatedProfile[name] = value;

        this.setState({ profile: updatedProfile });
    };



    saveProfile = (e) => {
        e.preventDefault();
        this.props.saveProfile(this.state.profile);
    };



    savePayment = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.doPreSavePayment()) { this.doSavePayment(); }
    };



    doPreSavePayment = () => {
        if (this.state.isPaymentFormCruding) { Bs.log("We're still processing..."); return false; }

        this.setState({ isPaymentFormCruding: true });
        return true;
    };



    doSavePayment = () => {
        let newPayment = this.state.newPayment;
        newPayment.expirationMonth = parseInt(newPayment.expirationMonth);
        newPayment.expirationYear = parseInt(newPayment.expirationYear);

        this.setState({ newPayment: newPayment });

        this.props.doSavePayment(this.state.newPayment, this.state.paymentFormCrudMethod);
    };



    doPostSavePayment = () => {
        if (this.props.wasPaymentFormCrudOk) {
            this.setState({
                newPayment: { cardNumber: "", expirationMonth: "01", expirationYear: "2022", cvc: "", postalCode: "" },
                isPaymentFormCruding: false
            });
        }
        else {
            this.setState({ isPaymentFormCruding: false });
        }

        this.props.doPostSavePaymentFinalization();
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



    onAddressFormShown = (e, address) => {
        e.preventDefault();

        if (address) {
            // edit address
            this.setState({
                editedAddress: address,
                addressFormCrudMethod: "edit"
            });
        } else {
            // create address
            this.setState({
                editedAddress: { street: "", city: "", province: "ON", country: "Canada", postalCode: "" },
                addressFormCrudMethod: "create"
            });
        }
    };



    onAddressDelete = (e, addressId) => {
        e.preventDefault();
        this.props.onAddressDelete(addressId);
    };



    onPaymenFormShown = (e, payment) => {
        e.preventDefault();
        Bs.log("payment ==> ...");
        Bs.log(payment);

        if (payment) {
            // edit payment
            this.setState({
                newPayment: { id: payment.id, cardNumber: "**** **** **** " + payment.card.last4, expirationMonth: payment.card.exp_month, expirationYear: payment.card.exp_year, cvc: "", postalCode: payment.billing_details.address.postal_code },
                paymentFormCrudMethod: "edit"
            });
        } else {
            // create payment
            this.setState({
                newPayment: { cardNumber: "", expirationMonth: "01", expirationYear: "2022", cvc: "", postalCode: "" },
                paymentFormCrudMethod: "create"
            });
        }

    };



    onAccountInputChange = (e) => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let updatedAccount = this.state.account;
        updatedAccount[name] = value;

        this.setState({ account: updatedAccount });
    };



    onSaveAccount = () => {
        if (this.doOnPreSaveAccountProcess()) { this.doOnActualSaveAccountProcess(); }
    };



    doOnActualSaveAccountProcess() {
        const data = {
            oldPassword: this.state.account.oldPassword,
            newPassword: this.state.account.newPassword,
            doCallBackFunc: this.doOnPostSaveAccountProcess,
        };


        this.props.saveAccount(data);
    }



    doOnPostSaveAccountProcess = (callBackData) => {

        switch (callBackData.resultCode) {
            case myConstants.RESULT_CODE_OLD_PASSWORD_WRONG.code:
                alert(myConstants.RESULT_CODE_OLD_PASSWORD_WRONG.msg);
                break;
            case 1:

                // Reset password-displays.
                const updatedAccount = {
                    ...this.state.account,
                    oldPassword: '',
                    newPassword: '',
                    newPasswordCopy: '',
                };
                this.setState({ account: updatedAccount });
                alert('Account updated.');

                break;

            default:
                BsCore2.alertForGeneralErrors(callBackData.errors);
                break;
        }


        this.setState({ isSavingAccount: false });
    };



    doOnPreSaveAccountProcess() {
        if (this.state.isSavingAccount) { return false; }
        if (this.state.account.oldPassword.trim().length == 0
            || this.state.account.newPassword.trim().length == 0
            || this.state.account.newPasswordCopy.trim().length == 0) {
            alert('Please fill in your credentials.');
            return false;
        }

        if (this.state.account.newPassword !== this.state.account.newPasswordCopy) {
            alert('Passwords don\'t match.');
            return false;
        }

        this.setState({ isSavingAccount: true });
        return true;
    }



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
                                            <Orders orders={this.props.orders} ordersMetaData={this.props.ordersMetaData} onOrderPageNumClick={this.onOrderPageNumClick} selectedPageNum={this.props.selectedOrderPageNum} />
                                            <Addresses addresses={this.props.addresses} onAddressFormShown={this.onAddressFormShown} onDelete={this.onAddressDelete} />
                                            <Payments paymentInfos={this.props.paymentInfos} onPaymenFormShown={this.onPaymenFormShown} />
                                            <Account account={this.state.account} onAccountInputChange={this.onAccountInputChange} onSaveAccount={this.onSaveAccount} isSavingAccount={this.state.isSavingAccount} />
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
                    isPaymentFormCruding={this.state.isPaymentFormCruding}
                    onPaymentFormInputChanged={this.onPaymentFormInputChanged}
                    savePayment={this.savePayment} />
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        selectedOrderPageNum: state.profile.selectedOrderPageNum,
        profile: state.profile.profile,
        shouldDisplayProfile: state.profile.shouldDisplayProfile,

        shouldDoPostSavePayment: state.profile.shouldDoPostSavePayment,
        wasPaymentFormCrudOk: state.profile.wasPaymentFormCrudOk,

        paymentInfos: state.profile.paymentInfos,
        // shouldResetPaymentForm: state.profile.shouldResetPaymentForm,
        addresses: state.profile.addresses,
        orders: state.profile.orders,
        ordersMetaData: state.profile.ordersMetaData,
        shouldResetAddressForm: state.profile.shouldResetAddressForm,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        checkBmdAuthValidity: (data) => dispatch(checkBmdAuthValidity(data)),

        saveAccount: (data) => dispatch(actions.saveAccount(data)),
        readOrders: (data) => dispatch(actions.readOrders(data)),
        readProfile: () => dispatch(actions.readProfile()),
        onProfileDisplayedSuccess: () => dispatch(actions.onProfileDisplayedSuccess()),
        saveProfile: (profile) => dispatch(actions.saveProfile(profile)),
        doSavePayment: (newPayment, paymentFormCrudMethod) => dispatch(actions.savePayment(newPayment, paymentFormCrudMethod)),
        doPostSavePaymentFinalization: () => dispatch(actions.doPostSavePaymentFinalization()),
        // onPaymentFormResetSuccess: () => dispatch(actions.onPaymentFormResetSuccess()),
        saveAddress: (address, addressFormCrudMethod) => dispatch(actions.saveAddress(address, addressFormCrudMethod)),
        onAddressFormResetSuccess: () => dispatch(actions.onAddressFormResetSuccess()),
        onAddressDelete: (addressId) => dispatch(actions.onAddressDelete(addressId)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));