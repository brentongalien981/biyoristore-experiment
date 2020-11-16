import React from 'react';
import { withRouter } from 'react-router-dom';
import Bs from '../../bs-library/helpers/Bs';



class TestPageWithHistoryNavigationBlocker extends React.Component {

    constructor(props) {
        super(props);

        // 
        Bs.log("\n\n##############################");
        Bs.log("this.props ==> ....");
        Bs.log(this.props);




        let unblock = this.props.history.block(() => {
            alert("Please wait we're processing your payment. If you wanna cancel your order, please contact customer service.");
            setTimeout(() => {
                unblock();
                this.props.history.push("/");
            }, 5000);
            return false;

        });

        // let unblock = this.props.history.block((location, action) => {

        //     Bs.log("location ==> ...");
        //     Bs.log(location);
        //     Bs.log("action ==> ...");
        //     Bs.log(action);
        //     Bs.log("this.props.history ==> ...");
        //     Bs.log(this.props.history);

        //     // alert("we blocked your transition");
        //     // this.props.history.goForward();
        //     return;
            


        //     // let url = location.pathname;
        //     // // let url = "shit";
        //     // if (window.confirm(`Are you sure you want to go to ${url}?`)) {
        //     //     // Unblock the navigation.
        //     //     unblock();

        //     //     // Retry the transition.
        //     //     // retry();
        //     // }
        // });
    }

    render() {
        return (
            <section className="hero" style={{ paddingTop: "200px", paddingBottom: "300px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h3>Navigation Blocker</h3>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}



export default withRouter(TestPageWithHistoryNavigationBlocker);