import React from 'react';



function Search() {
    return (
        <div className="modal fade search" id="search" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <input type="text" className="form-control" placeholder="Type your search here" aria-label="Type your search here" aria-describedby="button-addon2" />
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Search;