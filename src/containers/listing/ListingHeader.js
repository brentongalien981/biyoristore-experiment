import React from 'react';



function ListingHeader(props) {

    const categoryName = props.category ? props.category.name : "All Products";

    return (
        <div className="row justify-content-end">
            <div className="col-lg-9">
                <div className="row gutter-2 align-items-end">
                    <div className="col-md-6">
                        <h1 className="mb-0">{categoryName}</h1>
                        {/* <span className="eyebrow">20 products</span> */}
                    </div>
                    <div className="col-md-6 text-md-right">
                        <div className="dropdown">
                            <a className="btn btn-outline-secondary btn-sm dropdown-toggle" href="#!" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">What's New</a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#!">What's New</a>
                                <a className="dropdown-item" href="#!">Price high to low</a>
                                <a className="dropdown-item" href="#!">Price low to high</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ListingHeader;