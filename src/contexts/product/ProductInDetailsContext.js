import React from "react";

const ProductInDetailsContext = React.createContext({
    isAddingItemToCart: false,
    onAddToCart: () => {},
    onSizeOptionClick: () => {},
});

export default ProductInDetailsContext;