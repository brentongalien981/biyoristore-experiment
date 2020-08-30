import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';
import './FeaturedProductCategory.css';



function FeaturedProductCategory(props) {

    const c = props.category;
    const categoryPhotoUrl = "url(" + BsCore.pubPhotoUrl + c.productPhotoUrls[0].url + ")";
    const categoryImageStyle = {
        backgroundImage: categoryPhotoUrl
    };

    // const specialClass = props.hasSpecialClass ? "equal equal-125" : "equal";

    return (
        <div className="FeaturedProductCategory col-md-6">
            <a href="#!" className="card card-equal card-scale">
                <span className="image" style={categoryImageStyle}></span>
                <div className="card-footer">
                    <span className="btn btn-white btn-lg btn-action">{c.name}<span className="icon-arrow-right"></span></span>
                </div>
            </a>
        </div>
    );
}



export default FeaturedProductCategory;