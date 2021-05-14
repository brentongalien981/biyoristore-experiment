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
        case "xl":
            imgWidth = '100px';
            break;
        case "2xl":
            imgWidth = '125px';
            break;
        case "3xl":
            imgWidth = '150px';
            break;
        case "4xl":
            imgWidth = '175px';
            break;
        case "5xl":
            imgWidth = '200px';
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