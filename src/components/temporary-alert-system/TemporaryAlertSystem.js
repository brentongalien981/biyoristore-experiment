import React from 'react';
import { connect } from 'react-redux';
import './TemporaryAlertSystem.css';



class TemporaryAlertSystem extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    render() {

        const alerts = this.props.alerts.map((a, i) => {
            return (
                <div key={i} className="alert alert-primary alert-dismissible fade show AlertItem" role="alert">
                    {a.msg}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            );
        });

        return (
            <div className="AlertsHolder">
                {alerts}
            </div>
        );
    }



    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        alerts: state.temporaryAlerts.alerts,
    };
};


export default connect(mapStateToProps, null)(TemporaryAlertSystem);