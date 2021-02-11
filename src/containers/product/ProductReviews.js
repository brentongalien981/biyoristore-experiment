import React from 'react';
import WaitLoader from '../../components/loader/WaitLoader';



function ProductReviews(props) {

    const loaderComponent = props.isReadingReviews ? <WaitLoader /> : null;

    const reviews = props.reviews.map((r, i) => {
        const userAndDate = r.reviewerName + " (" + r.createdAt + ")";

        let ratingStarComponents = [];

        for (let i = 0; i < r.rating; i++) {
            ratingStarComponents.push(<span key={i} className="icon-ui-star"></span>);

        }

        return (
            <div className="col-12" key={i}>
                <blockquote className="testimonial">
                    <div className="testimonial-rate">
                        {ratingStarComponents}
                    </div>
                    <p>{r.message}</p>
                    <footer>{userAndDate}</footer>
                </blockquote>
            </div>
        );
    });

    const showMoreReviewsBtn = (<button className="btn btn-lg btn-block btn-primary" onClick={props.readReviews}>show more</button>);



    return (
        <div className="modal fade sidebar" id="reviews" tabIndex="-1" role="dialog" aria-labelledby="reviewsLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">


                    <div className="modal-header">
                        <h5 className="modal-title" id="reviewsLabel">
                            Reviews<button className="btn btn-sm btn-primary ml-1" data-toggle="modal" data-target="#writeReview" data-dismiss="modal">write review</button>
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>


                    <div className="modal-body">
                        <div className="row gutter-3">
                            {reviews}
                            {loaderComponent}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="container-fluid">
                            <div className="row gutter-0">
                                <div className="col">
                                    {showMoreReviewsBtn}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}



export default ProductReviews;