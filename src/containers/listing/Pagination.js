import React from 'react';
import Bs from '../../bs-library/helpers/Bs';



function Pagination(props) {

    let pageNumElements = [];
    const numOfPages = props?.numOfPages;
    const currentPageNum = props.currentPageNum ? parseInt(props.currentPageNum) : 1;

    for (let i = 0; i < numOfPages; i++) {
        if (i+1 === currentPageNum) {
            pageNumElements.push(<li className="page-item active"><a className="page-link" href="#!">{i+1}<span className="sr-only">(current)</span></a></li>);
        } else {
            pageNumElements.push(<li className="page-item"><a className="page-link" href="#!">{i + 1}</a></li>);
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