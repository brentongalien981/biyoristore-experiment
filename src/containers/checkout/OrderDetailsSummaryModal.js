import React from 'react';
import AddressSummaryCard from './AddressSummaryCard';
import "./OrderDetailsSummaryModal.css";



export default function OrderDetailsSummaryModal(props) {

    return (
        <>
            <button id="OrderDetailsSummaryModalTriggerBtn" style={{ display: "none" }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#OrderDetailsSummaryModal">Launch modal</button>

            <div className="modal fade" id="OrderDetailsSummaryModal" tabIndex="-1" role="dialog" aria-labelledby="OrderDetailsSummaryModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="OrderDetailsSummaryModalLabel">Order Details Summary</h5>
                        </div>
                        <div className="modal-body">
                            <AddressSummaryCard address={props.address} addressType="shipping" />
                        </div>
                        <div className="modal-footer">
                            <div className="container-fluid">
                                <div className="row gutter-0">
                                    <div className="col">
                                        <button type="button" className="btn btn-block btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-block btn-primary" data-dismiss="modal" onClick={props.onOrderDetailsConfirm}>Confirm</button>
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