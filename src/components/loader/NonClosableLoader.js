import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import './NonClosableLoader.css';



export default function NonClosableLoader(props) {

    const msg = (props.msg ? props.msg : "Please wait...");


    return (
        <div className="NonClosableLoader">
            <div className="NonClosableLoader-body">
                <h5>{msg}</h5>
            </div>
        </div>
    );
}