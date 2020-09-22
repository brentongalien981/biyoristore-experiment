import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import HeaderLight from './HeaderLight';
import HeaderDark from './HeaderDark';
import BsAppSession from '../bs-library/helpers/BsAppSession';



class Header extends React.Component {
    render() {    
        if (this.props.location.pathname === "/") {
            return (<HeaderLight onLogout={this.onLogout} />);
        }
    
        return (<HeaderDark onLogout={this.onLogout} />);
    }



    onLogout = () => {
        BsAppSession.set("isLoggedIn", 0);
        this.props.history.push("/");
    };
}


export default withRouter(Header);