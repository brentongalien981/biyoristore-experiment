import React from 'react';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';



function ProductMainSection(props) {
    return (
        <section className="hero bg-light pt-5 animate__animated animate__fadeIn">
            <div className="container">
                <div className="row gutter-2 gutter-md-4 justify-content-between">
                    {/* <ProductGallery productPhotoUrls={props.product.productPhotoUrls} shouldResetGallery={props.shouldResetGallery} /> */}
                    <ProductGallery productPhotoUrls={props.product.productPhotoUrls} />
                    <ProductDetails product={props.product} isAddingItemToCart={props.isAddingItemToCart} />
                </div>
            </div>
        </section>
    );
}



export default ProductMainSection;