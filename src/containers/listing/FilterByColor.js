import React from 'react';



function FilterByColor() {

    return (
        <div className="widget">
            <span className="widget-collapse d-lg-none" data-toggle="collapse" data-target="#collapse-4" aria-expanded="false" aria-controls="collapse-4" role="button">Filter by Color</span>
            <div className="d-lg-block collapse" id="collapse-4">
                <span className="widget-title">Color</span>
                <div className="widget-content">
                    <div className="btn-group-toggle btn-group-square btn-group-colors" data-toggle="buttons">
                        <label className="btn active text-red">
                            <input type="checkbox" name="options" id="option1-2" checked />
                        </label>
                        <label className="btn text-blue">
                            <input type="checkbox" name="options" id="option2-2" />
                        </label>
                        <label className="btn text-yellow">
                            <input type="checkbox" name="options" id="option3-2" />
                        </label>
                        <label className="btn text-green">
                            <input type="checkbox" name="options" id="option4-2" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default FilterByColor;