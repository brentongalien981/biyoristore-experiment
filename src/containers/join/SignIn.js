import React from 'react';
import WaitLoader from '../../components/loader/WaitLoader';
import SocialMediaOptions from './SocialMediaOptions';



function SignIn(props) {

    let actualContent = (
        <>
            <SocialMediaOptions onSocialMediaOptionClick={props.onSocialMediaOptionClick} />

            <div className="form-group col-12 mt-2 d-flex justify-content-center">
                <label>- or -</label>
            </div>

            <div className="form-group col-12">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name="email" value={props.email} onChange={(e) => props.onCredentialChanged(e)} />
            </div>
            <div className="form-group col-12 mt-1">
                <label>Password</label>
                <input type="password" className="form-control" value={props.passwordForSignIn} name="passwordForSignIn" onChange={(e) => props.onCredentialChanged(e)} />
            </div>

            {/* <div className="col-12 mt-1">
                <div className="custom-control custom-switch mb-2">
                    <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                    <label className="custom-control-label" htmlFor="customSwitch1">Toggle this switch element</label>
                </div>
            </div> */}

            <div className="col-12 mt-2">
                <a href="#!" className="btn btn-block btn-primary" onClick={(e) => props.onLogin(e)}>Log In</a>
            </div>
        </>
    );


    if (props.isLoggingIn) {
        actualContent = (<WaitLoader size="md" />);
    }


    return (
        <div className="card active">

            <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Sign In</button>
                </h2>
            </div>

            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                    <div className="row mt-2">
                        {actualContent}
                    </div>
                </div>
            </div>

        </div>
    );
}



export default SignIn;