import * as actions from '../actions/temporaryAlerts';
import BsJLS from '../bs-library/helpers/BsJLS';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';

/** DEFAULTS */
const DEFAULT_ALERT = { msg: "DEFAULT ALERT MSG!", };



/** INITIAL STATE */
const initialState = {
    alerts: BsJLS.get('temporaryAlerts.alerts') ?? []
};



/** REDUCER */
const temporaryAlerts = (state = initialState, action) => {
    switch (action.type) {
        case actions.TRY_RESET_SYSTEM: return tryResetSystem(state, action);
        case actions.DELETE_ALERT: return deleteAlert(state, action);
        case actions.QUEUE_ALERT: return queueAlert(state, action);
        default: return state;
    }
}



/** NORMAL FUNCS */
const tryResetSystem = (state, action) => {

    let updatedAlerts = state.alerts;

    if (BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs.temporaryAlerts.alerts)) {
        updatedAlerts = [];
    }

    return {
        ...state,
        alerts: updatedAlerts
    };
};



const deleteAlert = (state, action) => {

    let updatedAlerts = [];
    
    state.alerts.forEach(a => {
        if (a.id !== action.alertId) {
            updatedAlerts.push(a);
        }
    });

    BsJLS.set('temporaryAlerts.alerts', updatedAlerts);

    return {
        ...state,
        alerts: updatedAlerts
    };
};



const queueAlert = (state, action) => {

    const updatedAlerts = [...state.alerts, action.obj];
    BsJLS.set('temporaryAlerts.alerts', updatedAlerts);
    BsJLSOLM.updateRefreshDate('temporaryAlerts.alerts');

    return {
        ...state,
        alerts: updatedAlerts
    };
};



export default temporaryAlerts;