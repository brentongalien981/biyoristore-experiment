import React from 'react';
import BsAppSession from '../../bs-library/helpers/BsAppSession';



export default function AddressFormGroup(props) {

    const addressType = props.addressType == "shipping" ? "Shipping Address" : "Billing Address";

    return (
        <>
            <div className="row align-items-end mb-2">
                <div className="col-md-6">
                    <h2 className="h3 mb-0">{addressType}</h2>
                </div>
                {getMyAddressesBtn()}
            </div>


            <div className="row gutter-1 mb-6">

                {getAddressFormSwitch(props.addressType)}

                <div className="form-group col-md-6">
                    <label for="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" />
                </div>
                <div className="form-group col-md-6">
                    <label for="lastName">Last Name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" />
                </div>

                <div className="form-group col-md-8">
                    <label for="address">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="" />
                </div>
                <div className="form-group col-md-4">
                    <label for="city">City</label>
                    <input type="text" className="form-control" id="city" placeholder="" />
                </div>

                <div className="form-group col-md-4">
                    <label for="province">Province</label>
                    <input type="text" className="form-control" id="province" placeholder="" />
                </div>
                <div className="form-group col-md-4">
                    <label for="country">Country</label>
                    <input type="text" className="form-control" id="country" placeholder="" />
                </div>

                <div className="form-group col-md-4">
                    <label for="postcode">Postal Code</label>
                    <input type="text" className="form-control" id="postcode" placeholder="" />
                </div>

                <div className="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="" />
                </div>
                <div className="form-group col-md-6">
                    <label for="phone">Phone Number</label>
                    <input type="phone" className="form-control" id="phone" placeholder="" />
                </div>

            </div>
        </>
    );
}



function getMyAddressesBtn() {
    if (BsAppSession.isLoggedIn()) {
        return (
            <div className="col-md-6 text-md-right">
                <a className="eyebrow unedrline action" data-toggle="modal" data-target="#addresses">My Addresses</a>
            </div>
        );
    }

    return null;
}



function getAddressFormSwitch(addressType) {
    if (addressType == "billing") {
        return (
            <div className="col-12">
                <div className="custom-control custom-switch mb-2">
                    <input type="checkbox" className="custom-control-input" id="billingSameAsDeliverySwitch" />
                    <label className="custom-control-label text-muted" for="billingSameAsDeliverySwitch">Billing address same as delivery address.</label>
                </div>
            </div>
        );
    }

    return null;
}