import React from 'react';



function ProductGallery() {
    return (
        <div className="col-lg-7">
            <div className="row gutter-1 justify-content-between">
                <div className="col-lg-10 order-lg-2">
                    <div className="owl-carousel gallery" data-slider-id="1" data-thumbs="true" data-nav="true">
                        <figure className="equal">
                            <a className="image" href="assets/images/iphone11.jpg"
                                style={{ backgroundImage: "url(assets/images/iphone11.jpg)" }}>
                            </a>
                        </figure>
                        <figure className="equal">
                            <a className="image" href="assets/images/iphone11b.jpg"
                                style={{ backgroundImage: "url(assets/images/iphone11b.jpg)" }}>
                            </a>
                        </figure>
                        <figure className="equal">
                            <a className="image" href="assets/images/imacpro"
                                style={{ backgroundImage: "url(assets/images/imacpro)" }}>
                            </a>
                        </figure>
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



export default ProductGallery;