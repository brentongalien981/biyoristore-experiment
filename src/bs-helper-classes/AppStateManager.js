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



    /** MAIN FUNCS */
    componentDidMount() {

        if (BmdAuth.isLoggedIn()) { this.props.checkBmdAuthValidity() }
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
        checkBmdAuthValidity: () => dispatch(actions.checkBmdAuthValidity()),
    };
};



export default connect(null, mapDispatchToProps)(AppStateManager);