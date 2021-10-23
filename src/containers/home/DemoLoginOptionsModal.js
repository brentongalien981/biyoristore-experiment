import React from 'react';
import BmdAuth from '../../bs-library/core/BmdAuth';
import BsAppSession from '../../bs-library/helpers/BsAppSession';



export default function DemoLoginOptionsModal(props) {

    if (BsAppSession.get("hasChosenDemoLoginOptions") == 1 || BmdAuth.isLoggedIn()) { return null; }

    const modalStyle = { maxWidth: '600px' };

    return (
        <>
            <button type="button" id="demoLoginOptionsModalBtn" style={{ display: "none" }} className="btn btn-primary" data-toggle="modal" data-target="#demoLoginOptionsModal">Launch modal</button>

            <div className="modal fade" id="demoLoginOptionsModal" tabIndex="-1" role="dialog" aria-labelledby="demoLoginOptionsModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={modalStyle} role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4>For Demo Purposes</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.onDismiss}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-footer">
                            <div className="container-fluid">
                                <div className="row gutter-0">
                                    <div className="col mr-2">
                                        <button type="button" className="btn btn-block btn-primary" data-dismiss="modal" onClick={props.onLogin}>Login as Demo User</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-block btn-primary" data-dismiss="modal" onClick={props.onDismiss}>Continue as Guest</button>
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