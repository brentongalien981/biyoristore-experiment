import React from 'react';
import BmdAuth from '../../bs-library/core/BmdAuth';
import BsAppSession from '../../bs-library/helpers/BsAppSession';



export default function AddressFormGroup(props) {

    const addressType = props.addressType == "shipping" ? "Shipping Address" : "Billing Address";
    let a = props.address;
    a = {
        id: a.id ? a.id : null,
        firstName: a.firstName ? a.firstName : "",
        lastName: a.lastName ? a.lastName : "",
        street: a.street ? a.street : "",
        city: a.city ? a.city : "",
        province: a.province ? a.province : "",
        country: a.country ? a.country : "",
        postalCode: a.postalCode ? a.postalCode : "",
        email: a.email ? a.email : "",
        phone: a.phone ? a.phone : ""
    };

    let disabledAttrib = { disabled: true };
    if (!a.id || a.id === 0) { disabledAttrib = {}; }


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
                    <input type="text" className="form-control" value={a.firstName} name="firstName" onChange={props.onOrderInputChange} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" value={a.lastName} name="lastName" onChange={props.onOrderInputChange} />
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="street">Street</label>
                    <input type="text" className="form-control" placeholder="" {...disabledAttrib} value={a.street} name="street" onChange={props.onOrderInputChange} />
                </div>
                <div className="form-group col-md-4">
                    <label>City</label>
                    <input type="text" className="form-control" placeholder="" {...disabledAttrib} value={a.city} name="city" onChange={props.onOrderInputChange} />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="province">State / Province</label>
                    <input type="text" className="form-control" placeholder="" {...disabledAttrib} value={a.province} name="province" onChange={props.onOrderInputChange} />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" placeholder="" {...disabledAttrib} value={a.country} name="country" onChange={props.onOrderInputChange} />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="postcode">ZIP / Postal Code</label>
                    <input type="text" className="form-control" placeholder="" {...disabledAttrib} value={a.postalCode} name="postalCode" onChange={props.onOrderInputChange} />
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" placeholder="" value={a.email} name="email" onChange={props.onOrderInputChange} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="phone" className="form-control" placeholder="" value={a.phone} name="phone" onChange={props.onOrderInputChange} />
                </div>

            </div>
        </>
    );
}



function getMyAddressesBtn(numOfAddresses) {
    if (BmdAuth.isLoggedIn() && numOfAddresses > 0) {
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