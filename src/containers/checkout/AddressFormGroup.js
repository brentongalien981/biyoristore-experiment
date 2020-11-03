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
                {getMyAddressesBtn(props.numOfAddresses)}
            </div>


            <div className="row gutter-1 mb-6">

                {getAddressFormSwitch(props.addressType)}

                <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="province">Province</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="postcode">Postal Code</label>
                    <input type="text" className="form-control" placeholder="" />
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" placeholder="" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="phone" className="form-control" placeholder="" />
                </div>

            </div>
        </>
    );
}



function getMyAddressesBtn(numOfAddresses) {
    if (BsAppSession.isLoggedIn() && numOfAddresses > 0) {
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
                    <label className="custom-control-label text-muted" htmlFor="billingSameAsDeliverySwitch">Billing address same as delivery address.</label>
                </div>
            </div>
        );
    }

    return null;
}