import React from 'react';



function FilterByBrand() {

    return (
        <div className="widget">
            <span className="widget-collapse d-lg-none" data-toggle="collapse" data-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2" role="button">Filter by Brand</span>
            <div className="d-lg-block collapse" id="collapse-2">
                <span className="widget-title">Brands</span>
                <div className="widget-content">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Calvin Klein</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck2" />
                        <label className="custom-control-label" htmlFor="customCheck2">Ralph Lauren</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck3" />
                        <label className="custom-control-label" htmlFor="customCheck3">Michael Kors</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck4" />
                        <label className="custom-control-label" htmlFor="customCheck4">Balenciaga</label>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default FilterByBrand;