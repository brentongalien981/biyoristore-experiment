import React from 'react';
// import Bs from '../../bs-library/helpers/Bs';
import './WaitLoader.css';
import loaderImg from './loading3.gif';



export default function WaitLoader(props) {

    const msg = (props.msg ? props.msg : "Please wait...");

    let componentVals = {
        loaderImgWidth: "100px",
        loaderCommentFontSize: "12px"
    };

    switch (props.size) {
        case "md":
            componentVals.loaderImgWidth = "150px";
            componentVals.loaderCommentFontSize = "14px";
            break;
        case "lg":
            componentVals.loaderImgWidth = "200px";
            componentVals.loaderCommentFontSize = "16px";
            break;
    }

    const commentStyle = { fontSize: componentVals.loaderCommentFontSize };


    return (
        <div className="WaitLoader">
            <div className="WaitLoader-body">
                <div className="ImgContainer">
                    <img src={loaderImg} className="rounded" width={componentVals.loaderImgWidth} />
                </div>

                <h6 className="Comment" style={commentStyle}>{msg}</h6>
            </div>
        </div>
    );
}