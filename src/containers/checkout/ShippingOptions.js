import React from 'react';
import Bs from '../../bs-library/helpers/Bs';



export default function ShippingOptions(props) {

    let msg = "Please choose your shipping option";
    // msg += (props.msg ? " " + props.msg : "");

    const options = props.shippingRates?.map((r, i) => {
        
        const label = r.service + " ==> " + r.delivery_days + " days ==> $" + r.rate + " " + r.currency;

        return (
            <li key={"shipping-rate-" + i}>
                <input type="radio" id={"rate-" + i} name="shipping-option" value={"shipping-option-" + i} />
                <label htmlFor={"rate-" + i}>{" " + label}</label>
            </li>
        );
    });

    return (
        <>
            <button id="ShippingOptionsTriggerBtn" style={{ display: "none" }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#ShippingOptions">Launch Loader</button>

            <div className="modal fade" id="ShippingOptions" tabIndex="-1" role="dialog" aria-labelledby="ShippingOptionsLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                        </div>

                        <div className="modal-body">
                            <h3>{msg}</h3>
                            <ul>{options}</ul>
                        </div>

                        <div className="modal-footer">
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}