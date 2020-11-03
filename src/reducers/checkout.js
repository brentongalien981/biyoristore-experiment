import * as actions from '../actions/checkout';
import Bs from '../bs-library/helpers/Bs';
import BsCore2 from '../bs-library/helpers/BsCore2';



/* STATE */
const initialState = {
    message: "This is the initial state of STORE: cart.",
    addresses: [],
    paymentInfos: [],
};



/* REDUCER */
const checkout = (state = initialState, action) => {
    switch (action.type) {
        // case actions.ON_ADDRESS_SELECTION_CHANGE: return onAddressSelectionChange(state, action);
        case actions.ON_READ_CHECKOUT_REQUIRED_DATA_SUCCESS: return onReadCheckoutRequiredDataSuccess(state, action);
        default: return state;
    }
};



/* NORMAL FUNCS */
// TODO: Delete this.
// const onAddressSelectionChange = (state, action) => {

//     let updatedAddresses = state.addresses;    
//     updatedAddresses = uncheckAllOptions(updatedAddresses);

//     let updatedAddress = updatedAddresses[action.i];
//     updatedAddress.isChecked = true;

//     updatedAddresses[action.i] = updatedAddress;

//     Bs.log("updatedAddress.street ==> " + updatedAddress.street);
//     Bs.log("updatedAddresses ==> ...");
//     Bs.log(updatedAddresses);

//     return {
//         ...state,
//         addresses: updatedAddresses
//     };
// };



const onReadCheckoutRequiredDataSuccess = (state, action) => {

    return {
        ...state,
        addresses: action.objs.addresses,
        paymentInfos: action.objs.paymentInfos
    };
};



/* HELPER FUNCS */
const uncheckAllOptions = (options) => {
    let updatedOptions = [];

    options.forEach(o => {
        o.isChecked = false;
        updatedOptions.push(o);
    });

    return updatedOptions;
};



export default checkout;