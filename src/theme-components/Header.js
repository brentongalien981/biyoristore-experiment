import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import HeaderLight from './HeaderLight';
import HeaderDark from './HeaderDark';

function Header(props) {

    
    if (props.location.pathname === "/") {
        return (<HeaderLight />);
    }

    return (<HeaderDark />);
}


export default withRouter(Header);