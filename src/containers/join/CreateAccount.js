import React from 'react';



function CreateAccount(props) {
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
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail2">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail2" name="email" value={props.email} onChange={(e) => props.onCredentialChanged(e)} />
                        </div>
                        <div className="form-group col-12 mt-1">
                            <label htmlFor="exampleInputPassword3">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword3" name="passwordForCreateAccount" onChange={(e) => props.onCredentialChanged(e)} />
                        </div>
                        <div className="form-group col-12 mt-1">
                            <label htmlFor="exampleInputPassword4">Repeat Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword4" name="repeatedPassword" onChange={(e) => props.onCredentialChanged(e)} />
                        </div>
                        <div className="col-12 mt-2">
                            <a href="#!" className="btn btn-block btn-primary" onClick={(e) => props.onRegister(e)}>Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default CreateAccount;