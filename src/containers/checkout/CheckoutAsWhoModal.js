import React from 'react';
import BsAppSession from '../../bs-library/helpers/BsAppSession';



export default function CheckoutAsWhoModal(props) {

    if (BsAppSession.get("hasChosenToCheckoutAsWho") == 1) { return null; }

    return (
        <>
            <button type="button" id="checkoutAsWhoModalBtn" style={{ display: "none" }} className="btn btn-primary" data-toggle="modal" data-target="#checkoutAsWhoModal">Launch modal</button>

            <div className="modal fade" id="checkoutAsWhoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4>Checkout as guest?</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.dismissModal}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-footer">
                            <div className="container-fluid">
                                <div className="row gutter-0">
                                    <div className="col">
                                        <button type="button" className="btn btn-block btn-secondary" data-dismiss="modal" onClick={props.dismissModal}>Yes</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-block btn-primary" data-dismiss="modal" onClick={props.login}>I have an account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}