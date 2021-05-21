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

    let updatedAlerts = BsJLS.get('temporaryAlerts.alerts') ?? [];

    if (BsJLSOLM.shouldObjRefresh(BsJLSOLM.objs?.temporaryAlerts?.alerts)) {
        updatedAlerts = [];
        if (BsJLS.set('temporaryAlerts.alerts', updatedAlerts)) { BsJLSOLM.updateRefreshDate('temporaryAlerts.alerts'); }
    }

    return {
        ...state,
        alerts: updatedAlerts
    };
};



const deleteAlert = (state, action) => {

    const oldAlerts = BsJLS.get('temporaryAlerts.alerts') ?? [];
    let updatedAlerts = [];
    
    oldAlerts.forEach(a => {
        if (a.id != action.alertId) {
            updatedAlerts.push(a);
        }
    });

    BsJLS.set('temporaryAlerts.alerts', updatedAlerts);

    return {
        ...state,
        alerts: [...updatedAlerts]
    };
};



const queueAlert = (state, action) => {

    const oldAlerts = BsJLS.get('temporaryAlerts.alerts') ?? [];
    const updatedAlerts = [...oldAlerts, action.obj];

    if (BsJLS.set('temporaryAlerts.alerts', updatedAlerts)) { BsJLSOLM.updateRefreshDate('temporaryAlerts.alerts'); }


    return {
        ...state,
        alerts: updatedAlerts
    };
};



export default temporaryAlerts;