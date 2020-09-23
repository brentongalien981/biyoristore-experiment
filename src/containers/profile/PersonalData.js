import React from 'react';



function PersonalData(props) {
    return (
        <div className="tab-pane fade show active" id="sidebar-1-1" role="tabpanel" aria-labelledby="sidebar-1-1">
            <div className="row mb-2">
                <div className="col-12">
                    <h3>Personal Data</h3>
                </div>
            </div>
            <div className="row gutter-1">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="exampleInput1">First Name</label>
                        <input id="exampleInput1" type="text" className="form-control" placeholder="First name" value={props.profile?.firstName} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="exampleInput2">Last Name</label>
                        <input id="exampleInput2" type="text" className="form-control" placeholder="Last name" value={props.profile?.lastName} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="exampleInput6">Telephone</label>
                        <input id="exampleInput6" type="text" className="form-control" placeholder="Telephone" value={props.profile?.phone} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="exampleInput7">Email</label>
                        <input id="exampleInput7" type="text" className="form-control" placeholder="Email" value={props.profile?.email} />
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col">
                    <a href="#!" className="btn btn-primary">Save Changes</a>
                </div>
            </div>
        </div>
    );
}



export default PersonalData;