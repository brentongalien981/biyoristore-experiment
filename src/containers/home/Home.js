import React from 'react';
import Hero from '../../theme-components/Hero';
import Separator from '../../theme-components/Separator';

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
}



export default Home;