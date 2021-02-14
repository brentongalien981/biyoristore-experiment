import Bs from "../bs-library/helpers/Bs";
import BsCore2 from "../bs-library/helpers/BsCore2";



/** NAMES */
export const TRY_RESET_SYSTEM = "TRY_RESET_SYSTEM";
export const DELETE_ALERT = "DELETE_ALERT";
export const QUEUE_ALERT = "QUEUE_ALERT";



/** FUNCS */
export const tryResetSystem = () => ({ type: TRY_RESET_SYSTEM, });
export const deleteAlert = (alertId) => ({ type: DELETE_ALERT, alertId: alertId });
export const queueAlert = (obj) => ({ type: QUEUE_ALERT, obj: obj });



/** AJAX FUNCS */