import React from 'react';



function SocialMediaOptions(props) {

    const isForSignup = props.isForSignup ? true : false;

    return (
        <div className="form-group col-12 d-flex justify-content-between">
            <a onClick={(e) => props.onSocialMediaOptionClick(e, isForSignup, 'facebook') } 
                style={{ color: "blue" }} 
                className="btn btn-light btn-with-ico">
                    <i className="fa fa-facebook" style={{ fontSize: "22px" }}></i> facebook</a>

            <a onClick={(e) => props.onSocialMediaOptionClick(e, isForSignup, 'google') } 
                style={{ color: "red" }} 
                className="btn btn-light btn-with-ico">
                    <i className="fa fa-google" style={{ fontSize: "22px" }}></i> google</a>
        </div>
    );
}



export default SocialMediaOptions;