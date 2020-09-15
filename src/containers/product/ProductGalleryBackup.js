import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';



function ProductGalleryBackup(props) {

    const hasError = props.hasError;
    const galleryItems = getGalleryItems(props.productPhotoUrls, hasError);
    const thumbNails = getThumbNails(props.productPhotoUrls, hasError);

    return (

            <div className="col-lg-7">
                {/* <h5>ProductGalleryBackup</h5> */}
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
    );
}



function getThumbNails(urls, hasError) {

    if (hasError) { urls = [{ id: 1, url: "default-product1.jpg" }, { id: 2, url: "default-product2.jpg" }]; }

    const thumbNails = urls?.map((u, i) => {

        const completeUrl = BsCore.pubPhotoUrl + u.url;

        return (
            <span key={i} className="owl-thumb-item"><img src={completeUrl} alt="" /></span>
        );
    });

    return thumbNails;
}



function getGalleryItems(urls, hasError) {

    if (hasError) { urls = [{ id: 1, url: "default-product1.jpg" }, { id: 2, url: "default-product2.jpg" }]; }

    const galleryItems = urls?.map((u, i) => {

        const completeUrl = BsCore.pubPhotoUrl + u.url;
        const urlAttribVal = "url(" + completeUrl + ")";

        return (
            <figure key={i} className="equal">
                <a className="image" href={completeUrl} style={{ backgroundImage: urlAttribVal }}></a>
            </figure>
        );
    });

    return galleryItems;
}



export default ProductGalleryBackup;