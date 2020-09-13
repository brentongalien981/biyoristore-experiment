import React from 'react';
import BsCore from '../../bs-library/helpers/BsCore';



function ProductGallery(props) {

    const thumbNails = getThumbNails(props.productPhotoUrls);

    return (
        <div className="col-lg-7">
            <div className="row gutter-1 justify-content-between">
                <div className="col-lg-10 order-lg-2">
                    <div className="owl-carousel gallery" data-slider-id="1" data-thumbs="true" data-nav="true">
                        {thumbNails}
                    </div>     
                </div>

                <div className="col-lg-2 text-center text-lg-left order-lg-1">
                    <div className="owl-thumbs" data-slider-id="1">
                        <span className="owl-thumb-item"><img src="assets/images/iphone11.jpg" alt="" /></span>
                        <span className="owl-thumb-item"><img src="assets/images/iphone11b.jpg" alt="" /></span>
                        <span className="owl-thumb-item"><img src="assets/images/imacpro" alt="" /></span>
                    </div>
                </div>

            </div>
        </div>
    );
}



function getThumbNails(urls) {
    const thumbNails = urls?.map((u, i) => {

        const completeUrl = BsCore.pubPhotoUrl + u.url;
        const urlAttribVal = "url(" + completeUrl + ")";

        return (
            <figure key={i} className="equal">
                <a className="image" href={completeUrl} style={{ backgroundImage: urlAttribVal }}></a>
            </figure>
        );
    });

    return thumbNails;
}



export default ProductGallery;