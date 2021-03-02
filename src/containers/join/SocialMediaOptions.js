import React from 'react';



function SocialMediaOptions(props) {
    return (
        <div className="form-group col-12 d-flex justify-content-between">
            <a style={{ color: "blue" }} className="btn btn-light btn-with-ico"><i className="fa fa-facebook" style={{ fontSize: "22px" }}></i> facebook</a>
            <a style={{ color: "red" }} className="btn btn-light btn-with-ico"><i className="fa fa-google" style={{ fontSize: "22px" }}></i> google</a>
        </div>
    );
}



export default SocialMediaOptions;