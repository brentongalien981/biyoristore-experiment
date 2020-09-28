import React from 'react';



function Addresses(props) {
    return (
        <div className="tab-pane fade" id="sidebar-1-3" role="tabpanel" aria-labelledby="sidebar-1-3">

            <div className="row">
                <div className="col">
                    <h3 className="mb-0">Addresses</h3>
                    <button type="button" className="btn btn-primary btn-with-ico" data-toggle="modal" data-target="#AddressForm" onClick={props.onAddressFormShown}><i className="icon-plus"></i> Add New Address</button>
                    {/* <span className="eyebrow">2 Entry</span> */}
                </div>
            </div>

            <div className="row gutter-2">
                {showAddresses(props.addresses, props.onAddressFormShown, props.onDelete)}
            </div>

        </div>
    );
}



function showAddresses(addresses, onAddressFormShown, onDelete) {
    const addressComponents = addresses.map((a, i) => {
        return (
            <div key={i} className="col-md-6">
                <div className="card card-data">
                    <div className="card-header card-header-options">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="card-title">Address {i+1}</h3>
                            </div>
                            <div className="col text-right">
                                <div className="dropdown">
                                    <button id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button" className="btn btn-lg btn-secondary btn-ico"><i className="icon-more-vertical"></i></button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li>
                                            <a className="dropdown-item" href="#!" data-toggle="modal" data-target="#AddressForm" onClick={(e) => onAddressFormShown(e, a)}>Edit</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#!" onClick={(e) => onDelete(e, a.id)}>Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body w-75">
                        <h5 className="eyebrow text-muted">Where</h5>
                        <p className="card-text">
                            {a.street}<br />{a.city}, {a.province}<br />{a.country}, {a.postalCode}
                        </p>
                    </div>
                </div>
            </div>
        );
    });


    return addressComponents;
}



export default Addresses;