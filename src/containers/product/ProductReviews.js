import React from 'react';



function ProductReviews(props) {

    const reviews = props.reviews.map((r, i) => {
        const userAndDate = r.firstName + " " + r.lastName + " on " + r.date;

        return (
            <div className="col-12" key={i}>
                <blockquote className="testimonial">
                    <div className="testimonial-rate">
                        <span className="icon-ui-star"></span>
                        <span className="icon-ui-star"></span>
                        <span className="icon-ui-star"></span>
                        <span className="icon-ui-star"></span>
                        <span className="icon-ui-star"></span>
                    </div>
                    <p>{r.message}</p>
                    <footer>{userAndDate}</footer>
                </blockquote>
            </div>
        );
    });



    return (
        <div className="modal fade sidebar" id="reviews" tabIndex="-1" role="dialog" aria-labelledby="reviewsLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">


                    <div className="modal-header">
                        <h5 className="modal-title" id="reviewsLabel">Reviews</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>


                    <div className="modal-body">
                        <div className="row gutter-3">
                            {reviews}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="container-fluid">
                            <div className="row gutter-0">
                                <div className="col">
                                    <a href="#!" className="btn btn-lg btn-block btn-primary" data-toggle="modal" data-target="#writeReview" data-dismiss="modal">Write Review</a>
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