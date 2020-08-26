import React from 'react';
import Hero from '../../theme-components/Hero';
import Separator from '../../theme-components/Separator';
import BsCore from '../../bs-library/helpers/BsCore';
import Bs from '../../bs-library/helpers/Bs';

class Home extends React.Component {
    render() {

        const content = "biyoristore.com doug!";

        return (
            <>
                <Hero content={content} />
                <Separator />
            </>
        );
    }



    componentDidMount() {
        BsCore.ajaxCrud({
            url: '/products/featured',
            params: {},
            callBackFunc: (requestData, json) => {
                Bs.log("#####################");
                Bs.log("json.objs ==> " + json.objs);
                Bs.log("json.isResultOk ==> " + json.isResultOk);
                Bs.log("products ==> " + json.objs);
            }
        });
    }
}



export default Home;