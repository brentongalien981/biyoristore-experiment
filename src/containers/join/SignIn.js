import React from 'react';



function SignIn() {
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
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" />
                        </div>
                        <div className="form-group col-12 mt-1">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>

                        {/* <div className="col-12 mt-1">
                            <div className="custom-control custom-switch mb-2">
                                <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                                <label className="custom-control-label" htmlFor="customSwitch1">Toggle this switch element</label>
                            </div>
                        </div> */}

                        <div className="col-12 mt-2">
                            <a href="#!" className="btn btn-block btn-primary">Log In</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}



export default SignIn;