import React from 'react';
import Bs from '../../bs-library/helpers/Bs';



export default function AddressOptions(props) {

    const addresses = props.addresses?.map((a, i) => {

        let completeAddress = a.street + ", " + a.city + " " + a.province + ", " + a.country + " " + a.postalCode;
        if (a.isBlankAddress) { completeAddress = "Let me fill-in my address."; }

        return (
            <div className="col-12" key={i}>
                <div className="custom-control custom-choice">
                    <input type="radio" name="addressChoiceRadio" className="custom-control-input" id={"customChoice" + i} onChange={() => props.onAddressSelectionChange(a)} />
                    <label className="custom-control-label text-dark" htmlFor={"customChoice" + i}>{completeAddress}</label>
                    <span className="choice-indicator"></span>
                </div>
            </div>
        );
    });



    return (
        <div className="modal sidebar fade" id="addresses" tabIndex="-1" role="dialog" aria-labelledby="addressesLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="addressesLabel">My Addresses</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="row gutter-3">
                            {addresses}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}