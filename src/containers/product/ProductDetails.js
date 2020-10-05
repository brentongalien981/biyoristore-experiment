import React from 'react';
import ProductColorFilter from './ProductColorFilter';
import ProductActions from './ProductActions';



function ProductDetails(props) {

    const p = props.product;

    return (
        <div className="col-lg-5 mb-5 mb-lg-0">
            {/* product main details */}
            <div className="row">
                <div className="col-12">
                    <span className="item-brand">{p?.brand?.name}</span>
                    <h1 className="item-title">{p?.name}</h1>
                    {/* <span className="item-price"><s className="text-muted">$113</s> $99</span> */}
                    <span className="item-price">${p?.price}</span>
                </div>
            </div>


            {/* product description */}
            <div className="row">
                <div className="col-12">
                    <p>{p?.description}</p>
                </div>
            </div>

            {/* <ProductColorFilter /> */}
            <ProductActions product={p} />
        </div>
    );
}



export default ProductDetails;