import React from 'react';



export default function FilterByTeam(props) {

    const teamFilters = props.teams.map((t, i) => {

        const inputId = "teamCheckbox" + t.id;
        const checkedAttrib = t.isSelected ? { checked: true } : { checked: false };

        return (
            <div key={i} className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={inputId} value={inputId} {...checkedAttrib} onChange={() => props.onTeamFilterChange(t.id)} />
                <label className="custom-control-label" htmlFor={inputId}>{t.name}</label>
            </div>
        );
    });



    return (
        <div className="widget">
            <span className="widget-collapse d-lg-none" data-toggle="collapse" data-target="#collapse-teams" aria-expanded="false" aria-controls="collapse-teams" role="button">Filter by Team</span>

            <div className="d-lg-block collapse" id="collapse-teams">
                <span className="widget-title">Teams</span>
                <div className="widget-content">{teamFilters}</div>
            </div>
        </div>
    );
}