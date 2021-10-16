import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
// import { a } from 'react-router-dom';



function Pagination(props) {

    let pageNumElements = [];
    const numOfPages = props?.roundedNumOfPages ?? 1;
    const currentPageNum = props.currentPageNum ? parseInt(props.currentPageNum) : 1;

    for (let i = 0; i < numOfPages; i++) {
        let pageNum = i + 1;

        const productLink = "/products?page=" + (i + 1);

        if (i + 1 === currentPageNum) {
            pageNumElements.push(<li key={i} className="page-item active"><a href="#" onClick={(e) => props.onPageNumClick(e, pageNum)} className="page-link">{i + 1}<span className="sr-only">(current)</span></a></li>);
        } else {
            pageNumElements.push(<li key={i} className="page-item"><a href="#" onClick={(e) => props.onPageNumClick(e, pageNum)} className="page-link">{i + 1}</a></li>);
        }
    }

    return (
        <div className="row">
            <div className="col">
                <nav className="d-inline-block">
                    <ul className="pagination">
                        {/* <li className="page-item active"><a className="page-link" href="#!">1 <span className="sr-only">(current)</span></a></li>
                        <li className="page-item" aria-current="page"><a className="page-link" href="#!">2</a></li>
                        <li className="page-item"><a className="page-link" href="#!">3</a></li>
                        <li className="page-item"><a className="page-link" href="#!">4</a></li> */}
                        {pageNumElements}
                    </ul>
                </nav>
            </div>
        </div>
    );
}



export default Pagination;