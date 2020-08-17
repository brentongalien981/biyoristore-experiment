import React from 'react';



function ProductExtraInfo() {
    return (
        <section className="separator-bottom">
            <div className="container">
                <div className="row gutter-2 gutter-lg-4">
                    <div className="col-md-4 col-lg-2">
                        <div className="rate">
                            <span>4.9</span>
                            <a data-toggle="modal" data-target="#reviews" className="action eyebrow text-primary underline">View Reviews</a>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-6">
                        <p>This minimalist backpack is suitable for any occasion. Whether on the road by bike, shopping or in the nightlife. The roll-top closes with velcro and allows a practical filling of the Hajo backpack.</p>
                    </div>
                    <div className="col-lg-4">
                        <ul className="list-group list-group-line">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                SKU<span className="text-dark">1421354</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Category<span className="text-dark"><a href="" className="underline text-dark">Bags</a>, <a href="" className="underline text-dark">Backpack</a></span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Tags<span className="text-dark"><a href="" className="underline text-dark">backpack</a>, <a href="" className="underline text-dark">minimal</a></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}



export default ProductExtraInfo;