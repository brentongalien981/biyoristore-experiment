import React from 'react';



function ProfileBanner(props) {
    return (
        <section className="hero hero-small bg-purple text-white">
            <div className="container">
                <div className="row gutter-2 gutter-md-4 align-items-end">
                    <div className="col-md-6 text-center text-md-left">
                        <h1 className="mb-0">{props.profile?.firstName}</h1>
                        {/* <span className="text-muted">New York, USA</span> */}
                    </div>
                </div>
            </div>
        </section>
    );
}



export default ProfileBanner;