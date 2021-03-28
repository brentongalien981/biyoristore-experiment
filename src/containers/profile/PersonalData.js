import React from 'react';
import WaitLoader from '../../components/loader/WaitLoader';



function PersonalData(props) {

    const firstName = props.profile.firstName ? props.profile.firstName : "";
    const lastName = props.profile.lastName ? props.profile.lastName : "";
    const phone = props.profile.phone ? props.profile.phone : "";



    let saveBtnSection = (
        <WaitLoader size="md" />
    );

    if (!props.isSavingPersonalData) {
        saveBtnSection = (
            <div className="row">
                <div className="col">
                    <a href="#!" className="btn btn-primary" onClick={props.saveProfile}>Save Changes</a>
                </div>
            </div>
        );
    }


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
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First name" name="firstName" value={firstName} onChange={props.onPersonalDataChanged} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Last name" name="lastName" value={lastName} onChange={props.onPersonalDataChanged} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Telephone</label>
                        <input type="phone" className="form-control" placeholder="Telephone" name="phone" value={phone} onChange={props.onPersonalDataChanged} />
                    </div>
                </div>

            </div>


            {saveBtnSection}

        </div>
    );
}



export default PersonalData;