import axios from 'axios';
import Bs from './Bs';



class BsCore2 {

    static appUrl = "";
    static appBackendUrl = "http://biyoristoreexperiment.test:8000";
    static appApiUrl = "http://biyoristoreexperiment.test:8000/api";
    static pubPhotoUrl = "https://s3.us-east-2.amazonaws.com/bs.s3.public/photos/";



    static alertForGeneralErrors(errors) {
        let errorMsg = "";

        for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
                const fieldErrors = errors[field];

                errorMsg += fieldErrors[0] + "\n";

            }
        }

        if (errorMsg.length > 0) { alert(errorMsg); }
        else { alert("Oops, there's an error on our end. Please try again."); }
    }



    static ajaxCrud(data = {}) {

        let defaultCrudData = {
            method: "get",
            url: data.url,
            params: {},
            callBackFunc: BsCore2.defaultCallBackFunc,
            neededResponseParams: [],
            errorCallBackFunc: BsCore2.defaultErrorCallBackFunc,
            ...data
        };


        // 
        let json = {
            originalResultData: null,
            isResultOk: false,
            objs: {},
            // isViewingOwnAccount: false,
            errors: {},
            customErrors: null
        };


        
        //
        axios({
            method: defaultCrudData.method,
            url: BsCore2.appApiUrl + defaultCrudData.url,
            params: defaultCrudData.params,
        })
            .then(function (response) {
                //
                Bs.log("\n\n\n##############################");
                Bs.log("Start of THEN clause");
                Bs.log("AJAX Request URL ==> " + defaultCrudData.url);
                Bs.log("##############################");
                

                BsCore2.displayObjects(response, "response");
                BsCore2.displayObjects(response.data, "response.data");
                // displayObjects(response.data.validatedData, "response.data.validatedData");

                const jsonData = response.data;

                json.originalResultData = jsonData;
                json.isResultOk = jsonData["isResultOk"];
                json.objs = jsonData["objs"];
                json.obj = jsonData["obj"];
                json.isViewingOwnAccount = jsonData["isViewingOwnAccount"];
                json.customErrors = jsonData["customErrors"];


                const neededResponseParams = defaultCrudData.neededResponseParams;
                for (const param of neededResponseParams) {
                    json[param] = jsonData[param];
                }



                try {
                    defaultCrudData.callBackFunc(defaultCrudData, json);
                } catch (error) {
                    Bs.log("\n##############################");
                    Bs.log("error calling the method: callBackFunc()");
                    Bs.log("error ==> ...");
                    Bs.log(error);
                    Bs.log("##############################");
                }


                Bs.log("\n##############################");
                Bs.log("End of THEN clause");
                Bs.log("AJAX Request URL ==> " + defaultCrudData.url);
                Bs.log("##############################");

            })
            .catch(function (error) {
                Bs.log("\n\n\n##############################");
                Bs.log("Start of the CATCH clause");
                Bs.log("AJAX Request URL ==> " + defaultCrudData.url);
                Bs.log("##############################");
                Bs.log("\nAJAX Request URL ==> " + defaultCrudData.url);


                BsCore2.displayErrors(error);
                json.errors = BsCore2.tryGetErrors(error);
                defaultCrudData.errorCallBackFunc(json.errors);


                Bs.log("\n##############################");
                Bs.log("End of the CATCH clause");
                Bs.log("AJAX Request URL ==> " + defaultCrudData.url);
                Bs.log("##############################");
            });
    }



    static tryGetErrors(error) {
        let actualErrors = null;

        try {
            actualErrors = error.response.data.errors;
        } catch (error) {
            Bs.displaySeparator(1);
            Bs.log("error in method: tryGetErrors()");
            Bs.log("error ==> ...");
            Bs.log(error);
            Bs.displaySeparator();
        }

        return actualErrors;
    }


    static defaultCallBackFunc(data, json) {
        Bs.displaySeparator(3);
        Bs.log("In method: defaultCallBackFunc()");
        Bs.log("NOTE: Override this callback func.");
        Bs.displaySeparator();
    }


    static defaultErrorCallBackFunc(errors) {
        Bs.displaySeparator(3);
        Bs.log("In method: defaultErrorCallBackFunc()");
        Bs.log("NOTICE: There's error with your AJAX request.");
        Bs.log("NOTE: Override this error callback func.");
        Bs.displaySeparator();
    }



    static displayErrors(error) {

        if (error === null) { return; }
        Bs.displaySeparator(1);
        Bs.log("Start of method:: displayErrors()");
        Bs.displaySeparator();
        Bs.log("\nerror ==> ...");
        Bs.log(error);


        Bs.log("\nlooping through object:: error...");
        for (const property in error) {
            if (error.hasOwnProperty(property)) {
                Bs.log(`${property}: ${error[property]}`);

            }
        }

        
        try {
            Bs.log("\nerror.response ==> ...");
            Bs.log(error.response);
        } catch (e) {
            Bs.log("\nerror displaying error.response");
        }

        try {
            Bs.log("\nerror.response.data.message ==> ...");
            Bs.log(error.response.data.message);
        } catch (e) {
            Bs.log("\nerror displaying error.response.data.message");
        }

        try {
            Bs.log("\nerror.response.data.errors ==> ...");
            Bs.log(error.response.data.errors);
        } catch (e) {
            Bs.log("\nerror displaying error.response.data.errors");
        }


        Bs.displaySeparator(1);
        Bs.log("End of method:: displayErrors()");
        Bs.displaySeparator();
    }


    static displayObjects(obj, objName) {

        Bs.displaySeparator(1);
        Bs.log("Start of method:: displayObjects()");
        Bs.displaySeparator();

        Bs.log("objName ==> " + objName);
        Bs.log("obj ==> ...");
        Bs.log(obj);


        Bs.log("\nlooping through object:: " + objName);
        for (const property in obj) {
            Bs.log(`${property}: ${obj[property]}`);
        }


        Bs.displaySeparator(1);
        Bs.log("End of method:: displayObjects()");
        Bs.displaySeparator();
    }
}



export default BsCore2;