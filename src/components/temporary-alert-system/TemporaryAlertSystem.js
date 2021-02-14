import React from 'react';
import { connect } from 'react-redux';
import Bs from '../../bs-library/helpers/Bs';
import './TemporaryAlertSystem.css';
import * as actions from '../../actions/temporaryAlerts';



class TemporaryAlertSystem extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */
    static createAlertObj(data) {
        const alertId = 'temporary-alert-' + Bs.getRandomId(8);

        return {
            id: alertId,
            msg: data.msg ?? ''
        };
    }



    /** MAIN FUNCS */
    componentDidMount() {
        this.props.tryResetSystem();
    }



    render() {

        const maxNumOfShownAlerts = 3;
        const alerts = this.props.alerts;
        let alertComponents = [];

        for (let i = 0; i < alerts.length; i++) {
            if (i >= maxNumOfShownAlerts) { break; }
            const a = alerts[i];

            alertComponents.push(
                <div key={i} id={a.id} className="alert alert-primary alert-dismissible fade show AlertItem" role="alert">
                    {a.msg}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={(e) => this.onAlertDismiss(a.id)}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            );
        }


        return (
            <div className="AlertsHolder">
                {alertComponents}
            </div>
        );
    }



    /** EVENT FUNCS */
    onAlertDismiss = (alertId) => {
        Bs.log(alertId);
        this.props.deleteAlert(alertId);
    };
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        alerts: state.temporaryAlerts.alerts,
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        tryResetSystem: () => dispatch(actions.tryResetSystem()),
        deleteAlert: (alertId) => dispatch(actions.deleteAlert(alertId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TemporaryAlertSystem);