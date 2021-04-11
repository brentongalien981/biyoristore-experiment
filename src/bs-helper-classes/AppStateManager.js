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
import { stopShit } from '../actions/join';
import OnSuccessfulJoin from '../bs-listeners/OnSuccessfulJoin';



class AppStateManager extends React.Component {

    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    componentDidUpdate() {
        //bmd-todo:delete
        if (this.props.doShit) {
            alert('Wow! Do some Shit then!');
            this.props.stopShit();
        }
    }



    componentDidMount() {
        BmdBrowserTabsManager.initNewTab();
        BsJLSOLM.init();
    }



    render() {
        return (
            <>
                <OnSuccessfulJoin />
            </>
        );
    }



    /** EVENT FUNCS */
}



/** REACT-FUNCS */
const mapStateToProps = (state) => {
    return {
        doShit: state.join.doShit, //bmd-todo:delete
    };
};



const mapDispatchToProps = (dispatch) => {
    return {
        stopShit: () => dispatch(stopShit()), //bmd-todo:delete
        checkBmdAuthValidity: (data) => dispatch(actions.checkBmdAuthValidity(data)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppStateManager));