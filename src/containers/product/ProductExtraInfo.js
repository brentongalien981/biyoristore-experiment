import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SpinnerLoader from '../../components/loader/SpinnerLoader/SpinnerLoader';
import './ProductExtraInfo.css';



function ProductExtraInfo(props) {
    const p = props.product;

    const categories = p?.categories?.map((c, i) => {
        const listingPageLinkWithCategory = "/products?category=" + c.id;
        return (
            <Link key={i} className="underline text-dark ProducExtraInfoItem" to={listingPageLinkWithCategory}>{c.name}</Link>
        );
    });


    const listingPageLinkWithBrand = "/products?brands=" + p.brand?.id;
    const brandExtraInfoItem = (<Link className="underline text-dark ProducExtraInfoItem" to={listingPageLinkWithBrand}>{p.brand?.name}</Link>);

    const listingPageLinkWithTeam = "/products?teams=" + p.team?.id;
    const teamExtraInfoItem = (<Link className="underline text-dark ProducExtraInfoItem" to={listingPageLinkWithTeam}>{p.team?.name}</Link>);


    let avgRating = parseFloat(props.avgRating);
    if (avgRating) { avgRating = avgRating.toFixed(1); }
    else { avgRating = '∞'; }


    let mainSection = (
        <div className="row gutter-2 gutter-lg-4 animate__animated animate__fadeIn">
            <div className="col-md-4 col-lg-2">
                <div className="rate">
                    <span>{avgRating}</span>
                    <a data-toggle="modal" data-target="#reviews" className="action eyebrow text-primary underline">View Reviews</a>
                </div>
            </div>

            <div className="col-md-8 col-lg-6">
                <p id="ShownProductDescription">{p?.description}</p>
            </div>

            <div className="col-lg-4 ExtraInfoItemsSection">
                <ul className="list-group list-group-line">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Brand<span className="text-dark">{brandExtraInfoItem}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center">Categories<span className="text-dark">{categories}</span></li>

                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Team<span className="text-dark">{teamExtraInfoItem}</span>
                    </li>
                </ul>
            </div>
        </div>
    );


    if (props.isReadingProduct) {
        mainSection = (
            <div className="row gutter-2 gutter-lg-4 animate__animated animate__fadeIn">
                <SpinnerLoader size='xl' />
            </div>
        );
    }



    return (
        <section className="separator-bottom">
            <div className="container">
                {mainSection}
            </div>
        </section>
    );
}



export default ProductExtraInfo;