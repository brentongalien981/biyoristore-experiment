import * as actions from '../actions/checkout';
import Bs from '../bs-library/helpers/Bs';
import BsCore2 from '../bs-library/helpers/BsCore2';



/* STATE */
const initialState = {
    message: "This is the initial state of STORE: cart.",
    // profile: {},
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

    const updatedAddresses = setAddresses(action.objs);

    return {
        ...state,
        // profile: action.objs.profile,
        addresses: updatedAddresses,
        paymentInfos: action.objs.paymentInfos
    };
};



/* HELPER FUNCS */
const setAddresses = (objs) => {
    let addresses = [];

    // Append an option for the user to fill-in her address.
    addresses.push({ id: 0, isBlankAddress: true });

    objs.addresses.forEach(a => {
        const addressWithProfile = { ...a, ...objs.profile };
        addresses.push(addressWithProfile);
    });

    return addresses;
};



const uncheckAllOptions = (options) => {
    let updatedOptions = [];

    options.forEach(o => {
        o.isChecked = false;
        updatedOptions.push(o);
    });

    return updatedOptions;
};



export default checkout;