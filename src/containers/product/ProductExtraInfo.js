import React from 'react';
import { NavLink } from 'react-router-dom';



function ProductExtraInfo(props) {
    const p = props.product;

    const categories = p?.categories?.map((c, i) => {
        return (
            <a key={i} href="#" className="underline text-dark" onClick={() => alert("TODO")}>{c.name}, </a>
        );
    });

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
                        <p>{p?.description}</p>
                    </div>
                    <div className="col-lg-4">
                        <ul className="list-group list-group-line">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                SKU<span className="text-dark">{"BS-" + p?.id}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center">Category<span className="text-dark">{categories}</span></li>

                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Tags<span className="text-dark"><a href="#" className="underline text-dark">gadget</a>, <a href="#" className="underline text-dark">tech</a></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}



export default ProductExtraInfo;