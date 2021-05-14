import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';
import ErrorBoundary from '../../error-boundaries/ErrorBoundary';



function ProductGallery(props) {

    const galleryItems = getGalleryItems(props.productPhotoUrls);
    const thumbNails = getThumbNails(props.productPhotoUrls);

    // const errorComponent = hasError ? <h4>Has Error</h4> : null;

    return (

        <ErrorBoundary productPhotoUrls={props.productPhotoUrls}>
            <div className="col-lg-7">
                <div className="row gutter-1 justify-content-between">
                    <div className="col-lg-10 order-lg-2">
                        <div className="owl-carousel gallery" data-slider-id="1" data-thumbs="true" data-nav="true">
                            {galleryItems}
                        </div>
                    </div>

                    <div className="col-lg-2 text-center text-lg-left order-lg-1">
                        <div className="owl-thumbs" data-slider-id="1">
                            {thumbNails}
                        </div>
                    </div>

                </div>
            </div>
        </ErrorBoundary>
    );
}



function getThumbNails(urls) {

    // if (hasError) { urls = [{ id: 1, url: "default-product1.jpg" }, { id: 2, url: "default-product2.jpg" }]; }

    const thumbNails = urls?.map((u, i) => {

        const completeUrl = BsCore.pubPhotoUrl + u.url;

        return (
            <span key={i} className="owl-thumb-item"><img src={completeUrl} alt="" /></span>
        );
    });

    return thumbNails;
}



function getGalleryItems(urls) {
    const galleryItems = urls?.map((u, i) => {

        const completeUrl = BsCore.pubPhotoUrl + u.url;
        const urlAttribVal = "url(" + completeUrl + ")";

        return (
            <figure key={i} className="equal animate__animated animate__fadeIn">
                <a className="image" href={completeUrl} style={{ backgroundImage: urlAttribVal }}></a>
            </figure>
        );
    });

    return galleryItems;
}



export default ProductGallery;