import React from 'react';



function PaymentModal(props) {

    return (
        <div className="modal fade" id="exampleModal-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Payment</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                    </div>

                </div>
            </div>
        </div>

    );
}



export default PaymentModal;