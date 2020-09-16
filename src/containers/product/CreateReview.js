import React from 'react';



function CreateReview() {
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
                                <label htmlFor="exampleFormControlInput1">Email address</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleFormControlSelect1">Rating</label>
                                <select className="form-control custom-select" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                            </div>
                        </form>
                    </div>


                    <div className="modal-footer">
                        <div className="container-fluid">
                            <div className="row gutter-0">
                                <div className="col">
                                    <a href="#!" className="btn btn-lg btn-block btn-primary" data-dismiss="modal" onClick={() => alert("TODO")}>Publish Review</a>
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