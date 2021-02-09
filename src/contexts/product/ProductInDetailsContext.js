import React from "react";

const ProductInDetailsContext = React.createContext({
    onAddToCart: () => {},
    onSizeOptionClick: () => {},
});

export default ProductInDetailsContext;