import * as actions from '../actions/temporaryAlerts';

/** DEFAULTS */
const DEFAULT_ALERT = { msg: "DEFAULT ALERT MSG!", };



/** INITIAL STATE */
const initialState = {
    alerts: [{ ...DEFAULT_ALERT }, { ...DEFAULT_ALERT }]
};



/** REDUCER */
const temporaryAlerts = (state = initialState, action) => {
    switch (action.type) {
        case actions.XXX: return xxx(state, action);
        default: return state;
    }
}



/** NORMAL */
const xxx = (state, action) => {

    return {
        ...state,
    };
};



export default temporaryAlerts;