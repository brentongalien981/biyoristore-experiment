import React from 'react';
import { Link } from 'react-router-dom';
import WaitLoader from '../../components/loader/WaitLoader';



function ForgotPasswordContent(props) {

    let actualContent = (
        <>
            <div className="form-group col-12">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name="email" value={props.email} onChange={(e) => props.onCredentialChanged(e)} />
            </div>

            <div className="col-12 mt-2">
                <a href="#!" className="btn btn-block btn-primary" onClick={(e) => props.onEmailUserResetLink(e)}>email reset-link</a>
            </div>
        </>
    );


    if (props.isRequestingForResetLinkEmail) {
        actualContent = (<WaitLoader size="md" />);
    }


    return (
        <div className="card active">

            <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#forgotPasswordCollapseSection" aria-expanded="true" aria-controls="forgotPasswordCollapseSection">Forgot Password</button>
                </h2>
            </div>

            <div id="forgotPasswordCollapseSection" className="collapse show" aria-labelledby="headingOne" data-parent="#forgotPasswordAccordion">
                <div className="card-body">
                    <div className="row mt-2">
                        {actualContent}
                    </div>
                </div>
            </div>

        </div>
    );
}



export default ForgotPasswordContent;