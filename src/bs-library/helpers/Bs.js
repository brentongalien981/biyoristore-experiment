class Bs {

    // BMD-ON-ITER: Every iteration, edit this.
    static appName = "BS";
    static detailedAppEnv = 'jobportfolio';
    static developmentOs = 'windows';

    static getRandomId(length = 64) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }



    static getAppUrl() {
        switch (Bs.detailedAppEnv) {
            case 'development':
                return 'http://localhost:3000';
            case 'pretesting':
                return 'http://192.168.1.116:7001';
            case 'prestaging':
            case 'staging':
                return "https://bmdstore.asbdev.com";
            case 'jobportfolio':
                return "http://bmdstore2.asbdev.com";
            default:
                return 'http://localhost:3000';
        }
    }



    static getAppBackendUrl() {
        switch (Bs.detailedAppEnv) {
            case 'development':
                if (Bs.developmentOs === 'mac') { return 'http://biyoristoreexperiment.test:8000'; }
                return 'http://biyoristoreexperiment.test';
            case 'pretesting':
                return 'http://192.168.1.116:9001';
            case 'prestaging':
            case 'staging':
                return "https://bmdbe.asbdev.com";
            case 'jobportfolio':
                return "http://bmdbe2.asbdev.com";
            default:
                return 'http://biyoristoreexperiment.test';
        }
    }



    static getAppApidUrl() {
        switch (Bs.detailedAppEnv) {
            case 'development':
                if (Bs.developmentOs === 'mac') { return 'http://biyoristoreexperiment.test:8000/api'; }
                return 'http://biyoristoreexperiment.test/api';
            case 'pretesting':
                return 'http://192.168.1.116:9001/api';
            case 'prestaging':
            case 'staging':
                return "https://bmdbe.asbdev.com/api";
            case 'jobportfolio':
                return "http://bmdbe2.asbdev.com/api";
            default:
                return 'http://biyoristoreexperiment.test/api';
        }
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
                const key = splitPair[0]?.trim();
                const value = splitPair[1]?.trim();

                if (acceptedParams.includes(key)) {
                    parsedParams[key] = value;
                }
            });
        }


        return parsedParams;
    }



    static compareNumberically(a, b) {
        return a - b;
    }
}



export default Bs;