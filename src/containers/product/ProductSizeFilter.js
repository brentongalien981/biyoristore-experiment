import React from 'react';
import Bs from '../../bs-library/helpers/Bs';
import './ProductSizeFilter.css';



function ProductSizeFilter(props) {

    if (!isProductBoughtWithSizes(props.product.packageItemTypeId)) { return null; }

    return (
        <div className="col-12">
            <div className="form-group">
                <label>Size</label>
                <div className="btn-group-toggle btn-group-square" data-toggle="buttons">
                    {getSizeOptionComponents(props.product)}
                </div>
            </div>
        </div>
    );
}



function getSizeOptionComponents(product) {


    let possibleSizeOptions = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
    if (product.packageItemTypeId == 5) {
        possibleSizeOptions = [];
        for (let size = 6.0; size <= 16.0; size+=0.5) {
            possibleSizeOptions.push(size.toFixed(1));
        }
    }


    const actualSizeAvailabilities = product.mostEfficientSeller?.sizeAvailabilities ?? [];
    let sizeOptionComponents = [];

    possibleSizeOptions.forEach(possibleSize => {
        let isPossibleSizeOptionAvailable = false;

        for (const availableSize of actualSizeAvailabilities) {
            if (possibleSize === availableSize.size
                && availableSize.quantity > 0) {
                isPossibleSizeOptionAvailable = true;
                break;
            }
        }

        if (isPossibleSizeOptionAvailable) {
            sizeOptionComponents.push(<label key={"option-" + possibleSize} className="btn AvailableSizeOption"><input type="radio" name="size-options" id={"size-option-" + possibleSize} />{possibleSize}</label>);
        } else {
            sizeOptionComponents.push(<label key={"option-" + possibleSize} className="btn UnavailableSizeOption"><input type="radio" name="size-options" id={"size-option-" + possibleSize} />{possibleSize}</label>);
        }
    });


    return sizeOptionComponents;

}



function isProductBoughtWithSizes(packageItemTypeId) {
    let returnVal = false;

    switch (packageItemTypeId) {
        case 1: // shirt
        case 2: // jersey
        case 3: // shorts
        case 4: // hoodie
        case 5: // shoes
            returnVal = true;
            break;
    }

    return returnVal;
};



export default ProductSizeFilter;