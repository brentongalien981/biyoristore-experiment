import React from 'react';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import SpinnerLoader from '../../components/loader/SpinnerLoader/SpinnerLoader';



function ProductMainSection(props) {

    let mainSection = (
        <>
            {/* <ProductGallery productPhotoUrls={props.product.productPhotoUrls} shouldResetGallery={props.shouldResetGallery} /> */}
            <ProductGallery productPhotoUrls={props.product.productPhotoUrls} />
            <ProductDetails product={props.product} isAddingItemToCart={props.isAddingItemToCart} />
        </>
    );


    if (props.isReadingProduct) {
        mainSection = (<SpinnerLoader size='xl' />);
    }


    return (
        <section className="hero pt-5 animate__animated animate__fadeIn">
            <div className="container">
                <div className="row gutter-2 gutter-md-4 justify-content-between">
                    {mainSection}
                </div>
            </div>
        </section>
    );
}



export default ProductMainSection;