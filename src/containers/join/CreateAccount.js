import React from 'react';
import WaitLoader from '../../components/loader/WaitLoader';
import SocialMediaOptions from './SocialMediaOptions';



function CreateAccount(props) {

    let actualContent = (
        <>
            <SocialMediaOptions isForSignup="true" onSocialMediaOptionClick={props.onSocialMediaOptionClick} />

            <div className="form-group col-12 mt-2 d-flex justify-content-center">
                <label>- or -</label>
            </div>

            <div className="form-group mt-2 col-12">
                <label htmlFor="exampleInputEmail2">Email address</label>
                <input type="email" className="form-control" name="email" value={props.email} onChange={(e) => props.onCredentialChanged(e)} />
            </div>
            <div className="form-group col-12 mt-1">
                <label htmlFor="exampleInputPassword3">Password</label>
                <input type="password" className="form-control" value={props.passwordForCreateAccount} name="passwordForCreateAccount" onChange={(e) => props.onCredentialChanged(e)} />
            </div>
            <div className="form-group col-12 mt-1">
                <label htmlFor="exampleInputPassword4">Repeat Password</label>
                <input type="password" className="form-control" value={props.repeatedPassword} name="repeatedPassword" onChange={(e) => props.onCredentialChanged(e)} />
            </div>
            <div className="col-12 mt-2">
                <a href="#!" className="btn btn-block btn-primary" onClick={(e) => props.onRegister(e)}>Register</a>
            </div>
        </>
    );

    if (props.isJoining) {
        actualContent = (<WaitLoader size="md" />);
    }



    return (
        <div className="card">
            <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Create Account</button>
                </h2>
            </div>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                    <div className="row mt-2">
                        {actualContent}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default CreateAccount;