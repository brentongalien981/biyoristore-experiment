import React from 'react';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';



function ProductMainSection() {
    return (
        <section className="hero bg-light pt-5">
            <div className="container">
                <div className="row gutter-2 gutter-md-4 justify-content-between">
                    <ProductGallery />
                    <ProductDetails />
                </div>
            </div>
        </section>
    );
}



export default ProductMainSection;