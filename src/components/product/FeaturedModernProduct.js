import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';



function FeaturedModernProduct(props) {

    const p = props.product;
    const productPhotoUrl = "url(" + BsCore.pubPhotoUrl + p.productPhotoUrls[0].url + ")";
    const productImageStyle = {
        backgroundImage: productPhotoUrl
    };

    const specialClass = props.hasSpecialClass ? "equal equal-125" : "equal";

    return (
        <div className="col-md-6">
            <a href="#!" className="product product-card">
                <div className={specialClass}>
                    <span className="image image-scale" style={productImageStyle}></span>
                    <h3 className="product-title">{p.name}</h3>
                    <div className="product-price-big"><span>$</span><span>{p.price}</span></div>
                </div>
            </a>
        </div>
    );
}



export default FeaturedModernProduct;