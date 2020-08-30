const initialState = {
    message: "This is the initial state of products-store.",
    products: [
        {
            title: "Fawn Wool / Natural Mammoth Chair",
            price: "2268",
            imageUrls: [
                "assets/images/iphone11.jpg",
                "assets/images/iphone11b.jpg"
            ]
        },
        {
            title: "Dark Stained NY11 Dining Chair",
            price: "504",
            imageUrls: [
                "assets/images/imacpro",
                "assets/images/demo/product-2-2.jpg",
                "assets/images/demo/product-2-3.jpg"
            ]
        },
        {
            title: "Black IC Pendant Light",
            price: "410",
            imageUrls: [
                "assets/images/ps5.png",
                "assets/images/demo/product-3-2.jpg"
            ]
        },
        {
            title: "Black Closca Helmet",
            price: "132",
            imageUrls: [
                "assets/images/demo/product-24.jpg",
                "assets/images/demo/product-24-2.jpg"
            ]
        },
        {
            title: "Gravel Black Sigg Water Bottle",
            price: "23",
            imageUrls: [
                "assets/images/demo/product-25.jpg",
                "assets/images/demo/product-25-2.jpg"
            ]
        },
        {
            title: "Red Analog Magazine Rack",
            price: "120",
            imageUrls: [
                "assets/images/demo/product-4.jpg",
                "assets/images/demo/product-4-2.jpg"
            ]
        },
        {
            title: "Black Piani Table Lamp",
            price: "290",
            imageUrls: [
                "assets/images/demo/product-5.jpg",
                "assets/images/demo/product-5-2.jpg"
            ]
        },
        {
            title: "Grey Pendant Bell Lamp",
            price: "258",
            imageUrls: [
                "assets/images/demo/product-6.jpg",
                "assets/images/demo/product-6-2.jpg"
            ]
        }
    ]
};

const products = (state = initialState, action) => {
    return state;
}


export default products;