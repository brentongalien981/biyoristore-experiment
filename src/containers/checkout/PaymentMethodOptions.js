import React from 'react';



export default function PaymentMethodOptions(props) {

    const paymentMethods = props.paymentInfos.map((p, i) => {

        let paymentLabel = "";
        if (p.id === 0) { paymentLabel = "Let me fill-in my payment info on checkout."; }
        else { paymentLabel = p.brand + " ends with " + p.last4 + " Exp: " + p.expMonth + "/" + p.expYear; }

        return (
            <div className="col-12" key={i}>
                <div className="custom-control custom-choice">
                    <input type="radio" id={"paymentOption" + i} name="paymentChoiceRadio" className="custom-control-input" onChange={() => props.onPaymentMethodSelectionChange(p)} />
                    <label htmlFor={"paymentOption" + i} className="custom-control-label text-dark">{paymentLabel}</label>
                    <span className="choice-indicator"></span>
                </div>
            </div>
        );
    });



    return (
        <div className="modal sidebar fade" id="payments" tabIndex="-1" role="dialog" aria-labelledby="paymentsLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="paymentsLabel">My Payment Methods</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="row gutter-3">
                            {paymentMethods}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}