import * as actions from '../actions/profile';
import Bs from '../bs-library/helpers/Bs';
import BsAppSession from '../bs-library/helpers/BsAppSession';

/** */
const initialState = {
    profile: {
    },
    shouldDisplayProfile: false
};



/* REDUCER */
const profile = (state = initialState, action) => {
    switch (action.type) {
        case actions.ON_SAVE_PROFILE_FAIL: return onSaveProfileFail(state, action);
        case actions.ON_SAVE_PROFILE_SUCCESS: return onSaveProfileSuccess(state, action);
        case actions.ON_PROFILE_DISPLAYED_SUCCESS: return onProfileDisplayedSuccess(state, action);
        case actions.SET_PROFILE: return setProfile(state, action);
        default: return state;
    }
}



/* NORMAL */
const onSaveProfileFail = (state, action) => {
    return {
        ...state,
    };
};

const onSaveProfileSuccess = (state, action) => {
    return {
        ...state,
    };
};

const onProfileDisplayedSuccess = (state, action) => {
    return {
        ...state,
        shouldDisplayProfile: false
    };
};

const setProfile = (state, action) => {
    return {
        ...state,
        profile: action.profile,
        shouldDisplayProfile: true
    };
};



export default profile;