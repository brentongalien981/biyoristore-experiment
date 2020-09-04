class Bs {

    static log(msg) {
        console.log(msg);
    }



    static getParsedQueryParams(q, acceptedParams) {

        //
        q = q.substr(1);
        const keyValuePairs = q.split('&');

        let parsedParams = [];

        keyValuePairs.forEach(pair => {
            const splitPair = pair.split('=');
            const key = splitPair[0].trim();
            const value = splitPair[1].trim();

            if (acceptedParams.includes(key)) {
                parsedParams[key] = value;
            }
        });

        return parsedParams;
    }
}



export default Bs;