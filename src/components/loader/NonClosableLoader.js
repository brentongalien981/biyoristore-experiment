import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import './NonClosableLoader.css';



export default function NonClosableLoader(props) {

    const msg = (props.msg ? props.msg : "Please wait...");


    return (
        <div className="NonClosableLoader">
            <div className="NonClosableLoader-body">
                <h6>{msg}</h6>
            </div>
        </div>
    );
}