import React from 'react';
import './SpinnerLoader.css';
import loaderImg from './spinner2.gif';



export default function SpinnerLoader(props) {

    let imgWidth = '25px';


    switch (props.size) {
        case "md":
            imgWidth = '50px';
            break;
        case "lg":
            imgWidth = '75px';
            break;
    }


    return (
        <div className="SpinnerLoader">
            <div className="SpinnerLoader-body">
                <div className="ImgContainer">
                    <img src={loaderImg} className="rounded" width={imgWidth} />
                </div>
            </div>
        </div>
    );
}