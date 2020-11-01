import React from 'react';
import Bs from '../../bs-library/helpers/Bs';



export default function AddressOptions(props) {

    Bs.log("\n###################################");
    Bs.log("props.address => ...");
    Bs.log(props.addresses);
    Bs.log("###################################");

    const addresses = props.addresses?.map((a, i) => {
        const completeAddress = a.street + ", " + a.city + " " + a.province + ", " + a.country + " " + a.postalCode;

        return (
            <div className="col-12" key={i}>
                <div className="custom-control custom-choice">
                    <input type="radio" name="choiceRadio" className="custom-control-input" id="customChoice1" />
                    <label className="custom-control-label text-dark" htmlFor="customChoice1">{completeAddress}</label>
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
                        <h5 className="modal-title" id="addressesLabel">My Addresses Shit</h5>
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