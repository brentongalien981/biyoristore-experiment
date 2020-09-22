import React from 'react';



function ProfileSideBar() {
    return (
        <aside className="col-lg-3">
            <div className="nav nav-pills flex-column lavalamp" id="sidebar-1" role="tablist">
                <a className="nav-link active" data-toggle="tab" href="#sidebar-1-1" role="tab" aria-controls="sidebar-1" aria-selected="true">Profile</a>
                <a className="nav-link" data-toggle="tab" href="#sidebar-1-2" role="tab" aria-controls="sidebar-1-2" aria-selected="false">Orders</a>
                <a className="nav-link" data-toggle="tab" href="#sidebar-1-3" role="tab" aria-controls="sidebar-1-3" aria-selected="false">Addresses</a>
                <a className="nav-link" data-toggle="tab" href="#sidebar-1-4" role="tab" aria-controls="sidebar-1-4" aria-selected="false">Payments</a>
            </div>
        </aside>
    );
}



export default ProfileSideBar;