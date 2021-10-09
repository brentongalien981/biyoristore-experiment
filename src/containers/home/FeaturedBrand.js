import React from 'react';
import { Link } from 'react-router-dom';
import BsCore from '../../bs-library/helpers/BsCore';
import './FeaturedBrand.css';



function FeaturedBrand(props) {

    const b = props.brand;
    const brandPhotoUrl = "url(" + BsCore.pubPhotoUrl + b.featuredProductPhotoUrl.url + ")";
    const brandImageStyle = {
        backgroundImage: brandPhotoUrl
    };

    const brandLink = '/products?brands=' + b.id;

    return (
        <div className="FeaturedBrand col-md-6 animate__animated animate__fadeIn">
            <Link to={brandLink} className="card card-equal card-scale">
                <span className="image" style={brandImageStyle}></span>
                <div className="card-footer">
                    <span className="btn btn-white btn-lg btn-action">{b.name}<span className="icon-arrow-right"></span></span>
                </div>
            </Link>
        </div>
    );
}



export default FeaturedBrand;