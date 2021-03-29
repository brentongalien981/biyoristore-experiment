import React from 'react';
import WaitLoader from '../../components/loader/WaitLoader';



function AddressForm(props) {
    const a = props.address;
    const methodTitle = (props.addressFormCrudMethod == "create" ? "New Address" : "Edit Address");
    const submitBtnText = (props.addressFormCrudMethod == "create" ? "Add" : "Update");


    let saveBtnSection = (
        <div className="col-12">
            <a href="#!" className="btn btn-primary" onClick={props.saveAddress}>{submitBtnText}</a>
        </div>
    );
    
    if (props.isSavingAddress) {
        saveBtnSection = (<WaitLoader />);
    }



    return (
        <div className="modal fade" id="AddressForm" tabIndex="-1" role="dialog" aria-labelledby="AddressFormLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="AddressFormLabel">{methodTitle}</h5>
                        <button id="closeAddressFormBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div className="modal-body">

                        <div className="row gutter-1">

                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="street">Street</label>
                                    <input type="text" className="form-control" placeholder="" name="street" value={a.street} onChange={props.onAddressFormInputChanged} />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" placeholder="" name="city" value={a.city} onChange={props.onAddressFormInputChanged} />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="province">State / Province</label>
                                    <input type="text" className="form-control" name="province" value={a.province} onChange={props.onAddressFormInputChanged} />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="postalCode">ZIP / Postal Code</label>
                                    <input type="text" className="form-control" name="postalCode" value={a.postalCode} onChange={props.onAddressFormInputChanged} />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" className="form-control" name="country" value={a.country} onChange={props.onAddressFormInputChanged} />
                                </div>
                            </div>


                            {saveBtnSection}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}



export default AddressForm;