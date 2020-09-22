import * as actions from '../actions/profile';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';

/** */
const initialState = {
    profile: {}
};



/* REDUCER */
const profile = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_PROFILE: return setProfile(state, action);
        default: return state;
    }
}



/* NORMAL */
const setProfile = (state, action) => {
    return {
        ...state,
        profile: action.profile
    };
};



export default profile;