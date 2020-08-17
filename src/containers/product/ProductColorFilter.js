import React from 'react';



function ProductColorFilter() {
    return (
        <div className="row mb-4">
            <div className="col-12">
                <div className="form-group">
                    <label>Color</label>
                    <div className="btn-group-toggle btn-group-square btn-group-colors" data-toggle="buttons">
                        <label className="btn active text-red">
                            <input type="radio" name="options" id="option1-2" checked />
                        </label>
                        <label className="btn text-blue">
                            <input type="radio" name="options" id="option2-2" />
                        </label>
                        <label className="btn text-yellow">
                            <input type="radio" name="options" id="option3-2" />
                        </label>
                        <label className="btn text-green">
                            <input type="radio" name="options" id="option4-2" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ProductColorFilter;