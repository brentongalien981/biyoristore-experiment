import * as actions from '../actions/bmdtest';

/** DEFAULTS */



/** INITIAL STATE */
const initialState = {
    count: 0
};



/** REDUCER */
const bmdtest = (state = initialState, action) => {
    switch (action.type) {
        case actions.INCREMENT_COUNT: return incrementCount(state, action);
        default: return state;
    }
}



/** NORMAL FUNCS */
const incrementCount = (state, action) => {

    return {
        ...state,
        count: ++state.count
    };
};



export default bmdtest;