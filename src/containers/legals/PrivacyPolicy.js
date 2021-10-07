import React from 'react';
import BlankBreadCrumbsSubstitute from '../../components/customized-spacers/BlankBreadCrumbsSubstitute';
import BlankSpacer from '../../components/customized-spacers/BlankSpacer';
import TopSpacer from '../../components/customized-spacers/TopSpacer';



class PrivacyPolicy extends React.Component {

    render() {
        return (
            <>
                {/* <BlankSpacer /> */}

                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2>Biyori Store Privacy Policy</h2>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col">

                                <p>
                                    This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from biyoristore.asbdev.com (the “Site”).
                                </p>


                                <br />
                                <h3>PERSONAL INFORMATION WE COLLECT</h3>
                                <br />

                                <p>
                                    When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
                                </p>

                                <br />
                                <h4>We collect Device Information using the following technologies:</h4>

                                <p>    - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>
                                <p>    - “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>
                                <p>    - “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
                                    [[INSERT DESCRIPTIONS OF OTHER TYPES OF TRACKING TECHNOLOGIES USED]]Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers [[INSERT ANY OTHER PAYMENT TYPES ACCEPTED]]), email address, and phone number.  We refer to this information as “Order Information.”
                                </p>

                                <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>


                                <br />
                                <h3>HOW DO WE USE YOUR PERSONAL INFORMATION?</h3>
                                <br />

                                <p>
                                    We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).  Additionally, we use this Order Information to:
                                    Communicate with you;Screen our orders for potential risk or fraud; and
                                </p>

                                <p>
                                    When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
                                </p>

                                <p>
                                    We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
                                </p>

                                
                            </div>
                        </div>

                    </div>
                </section>

            </>
        );
    }
}



/** REACT-FUNCS */



export default PrivacyPolicy;