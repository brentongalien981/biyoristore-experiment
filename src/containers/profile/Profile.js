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
import Orders from './Orders';



class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            newPayment: { cardNumber: "", expirationMonth: "01", expirationYear: "2022", cvc: "", postalCode: "" },
            isPaymentFormCruding: false,
            paymentFormCrudMethod: "create",

            editedAddress: { street: "", city: "", province: "ON", country: "Canada", postalCode: "" },
            addressFormCrudMethod: "create"
        };

        if (BsAppSession.get("isLoggedIn") == 0) { this.props.history.push("/"); }
    }



    componentDidMount() {
        this.props.readProfile();
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
        //ish
        e.preventDefault();
        Bs.log("TODO: onOrderPageNumClick()");
        Bs.log("pageNum ==> " + pageNum);

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
        readOrders: (objs) => dispatch(actions.readOrders(objs)),
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