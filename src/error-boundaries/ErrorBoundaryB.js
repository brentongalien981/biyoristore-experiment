import React from 'react';
import Bs from '../bs-library/helpers/Bs';



class ErrorBoundaryB extends React.Component {

    state = { hasError: false };

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
            return <h3>Oops, something went wrong. Please try again.</h3>;
        }

        return this.props.children;
    }
}



export default ErrorBoundaryB;