import React from 'react';



function Pagination(props) {

    return (
        <div className="row">
            <div className="col">
                <nav className="d-inline-block">
                    <ul className="pagination">
                        <li className="page-item active"><a className="page-link" href="#!">1 <span className="sr-only">(current)</span></a></li>
                        <li className="page-item" aria-current="page"><a className="page-link" href="#!">2</a></li>
                        <li className="page-item"><a className="page-link" href="#!">3</a></li>
                        <li className="page-item"><a className="page-link" href="#!">4</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}



export default Pagination;