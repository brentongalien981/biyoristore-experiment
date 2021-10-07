import React from 'react';
import BlankBreadCrumbsSubstitute from '../../components/customized-spacers/BlankBreadCrumbsSubstitute';
import BlankSpacer from '../../components/customized-spacers/BlankSpacer';
import TopSpacer from '../../components/customized-spacers/TopSpacer';
import './Legals.css';



class PrivacyPolicy extends React.Component {

    render() {
        return (
            <>
                {/* <BlankSpacer /> */}

                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3>Biyori Store Privacy Policy</h3>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col bmd-legal-page-sections">

                                <p>
                                    This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from biyoristore.asbdev.com (the “Site”).
                                </p>


                                <br />
                                <h4>PERSONAL INFORMATION WE COLLECT</h4>                                

                                <p>
                                    When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
                                </p>

                                <br />
                                <h5>We collect Device Information using the following technologies:</h5>

                                <p>    - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>
                                <p>    - “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>
                                <p>    - “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
                                    [[INSERT DESCRIPTIONS OF OTHER TYPES OF TRACKING TECHNOLOGIES USED]]Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers [[INSERT ANY OTHER PAYMENT TYPES ACCEPTED]]), email address, and phone number.  We refer to this information as “Order Information.”
                                </p>

                                <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>


                                <br />
                                <h4>HOW DO WE USE YOUR PERSONAL INFORMATION?</h4>
                        

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

                                <p>
                                    We share your Personal Information with third parties to help us use your Personal Information, as described above.  For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here:  https://www.shopify.com/legal/privacy.  We also use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here:  https://www.google.com/intl/en/policies/privacy/.  You can also opt-out of Google Analytics here:  https://tools.google.com/dlpage/gaoptout.
                                </p>

                                <p>
                                    Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                                </p>



                                <br />
                                <h4>BEHAVIOURAL ADVERTISING</h4>                                


                                <p>
                                    As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.  For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
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