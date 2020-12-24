import React from 'react';
import Bs from '../../bs-library/helpers/Bs';



export default function Loader(props) {

    let msg = "Please wait...";
    msg += (props.msg ? " " + props.msg : "");

    return (
        <>
            <button id="LoaderTriggerBtn" style={{ display: "none" }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#Loader">Launch Loader</button>

            <div shouldBeShown="no" className="modal fade" id="Loader" tabIndex="-1" role="dialog" aria-labelledby="LoaderLabel" aria-hidden="true" onClick={handleOnClick}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                        </div>

                        <div className="modal-body">
                            <h3>{msg}</h3>
                        </div>

                        <div className="modal-footer">
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}



function handleOnClick() {
    Bs.log("shit boi");
    return;
    const loader = document.querySelector("#Loader");
    if (loader.getAttribute("shouldBeShown") === "yes") {
        // re-show the loader
        const loaderTriggerBtn = document.querySelector("#LoaderTriggerBtn");
        Bs.log("re-show the loader");
        loaderTriggerBtn.click()
    }
}