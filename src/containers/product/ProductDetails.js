import React from 'react';
import ProductColorFilter from './ProductColorFilter';
import ProductActions from './ProductActions';



function ProductDetails() {
    return (
        <div className="col-lg-5 mb-5 mb-lg-0">
            {/* product main details */}
            <div className="row">
                <div className="col-12">
                    <span className="item-brand">Ucon Acrobatics</span>
                    <h1 className="item-title">Hajo Backpack</h1>
                    <span className="item-price"><s className="text-muted">$113</s> $99</span>
                </div>
            </div>


            {/* product description */}
            <div className="row">
                <div className="col-12">
                    <p>This minimalist backpack is suitable for any occasion. Whether on the road by bike, shopping or in the nightlife.</p>
                </div>
            </div>

            {/* <ProductColorFilter /> */}
            <ProductActions />
        </div>
    );
}



export default ProductDetails;