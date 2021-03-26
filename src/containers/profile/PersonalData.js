import React from 'react';



function PersonalData(props) {

    const firstName = props.profile.firstName ? props.profile.firstName : "";
    const lastName = props.profile.lastName ? props.profile.lastName : "";
    const phone = props.profile.phone ? props.profile.phone : "";

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
                        <input id="exampleInput1" type="text" className="form-control" placeholder="First name" name="firstName" value={firstName} onChange={props.onPersonalDataChanged} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="exampleInput2">Last Name</label>
                        <input id="exampleInput2" type="text" className="form-control" placeholder="Last name" name="lastName" value={lastName} onChange={props.onPersonalDataChanged} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="exampleInput6">Telephone</label>
                        <input id="exampleInput6" type="text" className="form-control" placeholder="Telephone" name="phone" value={phone} onChange={props.onPersonalDataChanged} />
                    </div>
                </div>
                
            </div>


            <div className="row">
                <div className="col">
                    <a href="#!" className="btn btn-primary" onClick={props.saveProfile}>Save Changes</a>
                </div>
            </div>
        </div>
    );
}



export default PersonalData;