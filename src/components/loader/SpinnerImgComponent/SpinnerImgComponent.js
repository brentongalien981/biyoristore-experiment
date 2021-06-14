import React from 'react';
import loaderImg from './spinner2.gif';



export default function SpinnerImgComponent(props) {

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
        <img src={loaderImg} className="rounded cart-item-close" width={imgWidth} />
    );
}