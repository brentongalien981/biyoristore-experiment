import React from 'react';
import { SORT_FILTER_CODES } from './helpers/constants';



function ListingHeader(props) {

    const categoryName = props.category.name ?? "All Products";

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
                            <a className="btn btn-outline-secondary btn-sm dropdown-toggle" href="#!" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.sortFilterCode.description}</a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#!" onClick={(e) => props.onSortFilterClick(e, SORT_FILTER_CODES.NAME_ASC)}>{SORT_FILTER_CODES.NAME_ASC.description}</a><br />
                                <a className="dropdown-item" href="#!" onClick={(e) => props.onSortFilterClick(e, SORT_FILTER_CODES.NAME_DESC)}>{SORT_FILTER_CODES.NAME_DESC.description}</a><br />
                                <a className="dropdown-item" href="#!" onClick={(e) => props.onSortFilterClick(e, SORT_FILTER_CODES.PRICE_ASC)}>{SORT_FILTER_CODES.PRICE_ASC.description}</a><br />
                                <a className="dropdown-item" href="#!" onClick={(e) => props.onSortFilterClick(e, SORT_FILTER_CODES.PRICE_DESC)}>{SORT_FILTER_CODES.PRICE_DESC.description}</a><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ListingHeader;