import React from 'react';



export function TemporaryAlertComponent(props) {
    return (
        <div className="alert alert-primary alert-dismissible fade show" role="alert">
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
    );
}