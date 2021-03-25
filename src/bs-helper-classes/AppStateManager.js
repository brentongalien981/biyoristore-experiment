import React from 'react';
import { connect } from 'react-redux';
import BsJLSOLM from '../bs-library/helpers/BsJLSOLM';
import * as actions from '../actions/appStateManager';
import BsJLS from '../bs-library/helpers/BsJLS';
import Bs from '../bs-library/helpers/Bs';
import BsAppLocalStorage from '../bs-library/helpers/BsAppLocalStorage';
import BmdBrowserTabsManager from '../bs-library/helpers/BmdBrowserTabsManager';
import BmdAuth from '../bs-library/core/BmdAuth';



class AppStateManager extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */
    checkBmdAuthValidity() {

        if (!BmdAuth.isLoggedIn()) { return; }

        const auth = BmdAuth.getInstance();

        if (auth) {
            const data = {
                ...auth,
            };

            this.props.checkBmdAuthValidity(data);
        }

    }



    /** MAIN FUNCS */
    componentDidMount() {

        this.checkBmdAuthValidity();
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
        // flagCacehBmdAuthExpiring: () => dispatch(actions.flagCacehBmdAuthExpiring()),
        checkBmdAuthValidity: (data) => dispatch(actions.checkBmdAuthValidity(data)),
        // queueAlert: (obj) => dispatch(queueAlert(obj)),
    };
};



export default connect(null, mapDispatchToProps)(AppStateManager);