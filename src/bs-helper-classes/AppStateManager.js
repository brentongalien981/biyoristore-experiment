import React from 'react';
import { connect } from 'react-redux';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';
import * as actions from '../actions/appStateManager';
import BsJLS from '../bs-library/helpers/BsJLS';
import Bs from '../bs-library/helpers/Bs';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BmdBrowserTabsManager from '../bs-library/helpers/BmdBrowserTabsManager';
import BmdAuth from '../bs-library/core/BmdAuth';
import { withRouter } from 'react-router';



class AppStateManager extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */
    doOnCheckBmdAuthValidityProcess = (isResultOk = false) => {
        if (!isResultOk) {
            // TODO: 
            if (!BmdAuth.isAuthorizedForWebPage(this.props.location.pathname)) {
                alert('bmd-auth invalid. should logout');
                this.props.history.replace('/');
            }


        }
    };



    /** MAIN FUNCS */
    componentDidMount() {

        const data = { doCallBackFunc: this.doOnCheckBmdAuthValidityProcess, };
        if (BmdAuth.isLoggedIn()) { this.props.checkBmdAuthValidity(data) }

        BmdBrowserTabsManager.initNewTab();
        BsJLSOLM.init();
    }



    render() {
        return null;
    }



    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapDispatchToProps = (dispatch) => {
    return {
        checkBmdAuthValidity: (data) => dispatch(actions.checkBmdAuthValidity(data)),
    };
};



export default connect(null, mapDispatchToProps)(withRouter(AppStateManager));