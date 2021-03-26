import React from 'react';
import WaitLoader from '../../components/loader/WaitLoader';



export default function Account(props) {

    const email = props.account.email;
    const oldPassword = props.account.oldPassword;
    const newPassword = props.account.newPassword;
    const newPasswordCopy = props.account.newPasswordCopy;


    let savePasswordBtnSection = (
        <WaitLoader size="md" />
    );

    if (!props.isSavingAccount) {
        savePasswordBtnSection = (
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={props.onSaveAccount}>Save Changes</button>
                </div>
            </div>
        );
    }


    return (
        <div className="tab-pane fade" id="sidebar-1-5" role="tabpanel" aria-labelledby="sidebar-1-5">

            <div className="row mb-2">
                <div className="col-12">
                    <h3>Account</h3>
                </div>
            </div>



            {/* email */}
            <div className="row gutter-1">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" placeholder="Email" name="email" value={email} disabled />
                    </div>
                </div>
            </div>
            <br />




            {/* password */}
            <div className="row gutter-1">

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Old Password</label>
                        <input type="password" className="form-control" placeholder="Old Password" name="oldPassword" value={oldPassword} onChange={props.onAccountInputChange} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-control" placeholder="New Password" name="newPassword" value={newPassword} onChange={props.onAccountInputChange} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Re-type New Password</label>
                        <input type="password" className="form-control" placeholder="Re-type New Password" name="newPasswordCopy" value={newPasswordCopy} onChange={props.onAccountInputChange} />
                    </div>
                </div>

            </div>



            {savePasswordBtnSection}

        </div>
    );
}