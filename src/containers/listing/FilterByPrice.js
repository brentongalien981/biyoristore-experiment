import React from 'react';



function FilterByPrice() {

    return (
        <div className="widget">
            <span className="widget-collapse d-lg-none" data-toggle="collapse" data-target="#collapse-5" aria-expanded="false" aria-controls="collapse-5" role="button">Filter by Price</span>
            <div className="d-lg-block collapse" id="collapse-5">
                <span className="widget-title">Price</span>
                <div className="widget-content">
                    <input type="text" className="rangeslider" name="Range Slider" value="" />
                </div>
            </div>
        </div>
    );
}



export default FilterByPrice;