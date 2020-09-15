import React from 'react';
import Bs from '../bs-library/helpers/Bs';
import ProductGalleryBackup from '../containers/product/ProductGalleryBackup';
// import ProductGallery from '../containers/product/ProductGallery';



class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        Bs.log("\n####################");
        Bs.log("ERROR ERROR ERROR");
        Bs.log("error ==> ...");
        Bs.log(error);
        Bs.log("errorInfo ==> ...");
        Bs.log(errorInfo);
        Bs.log("\n@@@@@@@@@@@@@@@@@@@@");
        Bs.log("END OF ERROR");
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            // return <h1>Something went wrong.</h1>;

            Bs.log("\n####################");
            Bs.log("CLASS: ErrorBoundary");
            Bs.log("this.props.productPhotoUrls ==> ...");
            Bs.log(this.props.productPhotoUrls);
            Bs.log("END OF CLASS: ErrorBoundary");
            Bs.log("####################\n");
            return <ProductGalleryBackup productPhotoUrls={this.props.productPhotoUrls} />
        }

        return this.props.children;
    }
}



export default ErrorBoundary;