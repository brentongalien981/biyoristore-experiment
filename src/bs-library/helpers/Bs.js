class Bs {

    static getRandomId(length = 64) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }



    static log(msg) {
        console.log(msg);
    }



    static displaySeparator(numOfLineBreaks = 0) {
        for (let i = 0; i < numOfLineBreaks; i++) {
            Bs.log("\n");

        }
        Bs.log("###################################");
    }



    static getParsedQueryParams(q, acceptedParams) {

        //
        q = q.substr(1);
        const keyValuePairs = q.split('&');

        let parsedParams = [];

        if (q) {
            keyValuePairs.forEach(pair => {
                const splitPair = pair.split('=');
                const key = splitPair[0].trim();
                const value = splitPair[1].trim();

                if (acceptedParams.includes(key)) {
                    parsedParams[key] = value;
                }
            });
        }


        return parsedParams;
    }
}



export default Bs;