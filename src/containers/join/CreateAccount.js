import React from 'react';



function CreateAccount() {
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
                            <input type="email" className="form-control" id="exampleInputEmail2" />
                        </div>
                        <div className="form-group col-12 mt-1">
                            <label htmlFor="exampleInputPassword3">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword3" />
                        </div>
                        <div className="form-group col-12 mt-1">
                            <label htmlFor="exampleInputPassword4">Repeat Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword4" />
                        </div>
                        <div className="col-12 mt-2">
                            <a href="#!" className="btn btn-block btn-primary">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default CreateAccount;