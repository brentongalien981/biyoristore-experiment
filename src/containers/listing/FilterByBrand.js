import React from 'react';



function FilterByBrand(props) {

    const brandFilters = props.brands.map((b) => {

        const inputId = "customCheck" + b.id;

        return (
            <div key={b.id} className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={inputId} />
                <label className="custom-control-label" htmlFor={inputId}>{b.name}</label>
            </div>
        );
    });

    return (
        <div className="widget">
            <span className="widget-collapse d-lg-none" data-toggle="collapse" data-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2" role="button">Filter by Brand</span>
            <div className="d-lg-block collapse" id="collapse-2">
                <span className="widget-title">Brands</span>
                <div className="widget-content">

                    {/* <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Calvin Klein</label>
                    </div> */}
                    {brandFilters}

                </div>
            </div>
        </div>
    );
}



export default FilterByBrand;