import React from 'react';
import './MiniImageLoader.css';
import loaderImg from './earth-spinner.gif';



export default function MiniImageLoader(props) {

    let imgWidth = '75px';


    switch (props.size) {
        case "md":
            imgWidth = '100px';
            break;
        case "lg":
            imgWidth = '125px';
            break;
    }


    return (
        <div className="MiniImageLoader">
            <div className="MiniImageLoader-body">
                <div className="ImgContainer">
                    <img src={loaderImg} className="rounded" width={imgWidth} />
                </div>
            </div>
        </div>
    );
}