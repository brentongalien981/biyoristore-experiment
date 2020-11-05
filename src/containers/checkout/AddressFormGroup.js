import React from 'react';
import BsAppSession from '../../bs-library/helpers/BsAppSession';



export default function AddressFormGroup(props) {

    const addressType = props.addressType == "shipping" ? "Shipping Address" : "Billing Address";
    const a = props.address;

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
                    <input type="text" className="form-control" value={a.firstName} name="phone" onChange={props.onOrderInputChange} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" value={a.lastName} name="phone" onChange={props.onOrderInputChange} />
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="street">Street</label>
                    <input type="text" className="form-control" placeholder="" value={a.street} name="street" onChange={props.onOrderInputChange} />
                </div>
                <div className="form-group col-md-4">
                    <label>City</label>
                    <input type="text" className="form-control" placeholder="" value={a.city} name="city" onChange={props.onOrderInputChange} />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="province">Province</label>
                    <input type="text" className="form-control" placeholder="" value={a.province} name="province" onChange={props.onOrderInputChange} />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" placeholder="" value={a.country} name="country" onChange={props.onOrderInputChange} />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="postcode">Postal Code</label>
                    <input type="text" className="form-control" placeholder="" value={a.postalCode} name="postalCode" onChange={props.onOrderInputChange} />
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