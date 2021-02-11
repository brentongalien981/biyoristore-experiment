import React from 'react';



function CreateReview(props) {
    return (
        <div className="modal fade sidebar" id="writeReview" tabIndex="-1" role="dialog" aria-labelledby="writeReviewLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">


                    <div className="modal-header">
                        <h5 className="modal-title" id="writeReviewLabel">New Review</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>


                    <div className="modal-body">
                        <form className="row gutter-2">

                            <div className="form-group col-12">
                                <label>Rating</label>
                                <select className="form-control custom-select" name="rating" value={props.newReview.rating} onChange={props.onNewReviewInputChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div className="form-group col-12">
                                <label>Message</label>
                                <textarea className="form-control" name="message" rows="5" onChange={props.onNewReviewInputChange}></textarea>
                            </div>
                        </form>
                    </div>


                    <div className="modal-footer">
                        <div className="container-fluid">
                            <div className="row gutter-0">
                                <div className="col">
                                    <a href="#!" className="btn btn-lg btn-block btn-primary" data-dismiss="modal" onClick={(e) => props.onSaveReview(e)}>Publish Review</a>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}



export default CreateReview;