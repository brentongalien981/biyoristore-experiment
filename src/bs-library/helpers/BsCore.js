import axios from 'axios';
import Bs from './Bs';



class BsCore {

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
            callBackFunc: BsCore.defaultCallBackFunc,
            neededResponseParams: [],
            errorCallBackFunc: BsCore.defaultErrorCallBackFunc,
            ...data
        };


        // 
        let json = {
            originalResultData: null,
            isResultOk: false,
            objs: [],
            // isViewingOwnAccount: false,
            errors: {},
            customErrors: null
        };


        axios({
            method: defaultCrudData.method,
            url: BsCore.appApiUrl + defaultCrudData.url,
            params: defaultCrudData.params,
        })
            .then(function (response) {
                //
                Bs.log("\n1st THEN clause ==> ...");
                Bs.log("\n\n\n\nGood results from METHOD:: BsCore.ajaxCrud()...");
                Bs.log("for request URL ==> " + defaultCrudData.url);

                BsCore.displayObjects(response, "response");
                BsCore.displayObjects(response.data, "response.data");
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

            })
            .catch(function (error) {
                Bs.log("\nCATCH clause ==> ...");
                BsCore.displayErrors(error);
                json.errors = BsCore.tryGetErrors(error);

                defaultCrudData.errorCallBackFunc(json.errors);
            })
            .then(function () {
                Bs.log("\n2nd THEN clause ==> ...");

                try {
                    defaultCrudData.callBackFunc(defaultCrudData, json);
                } catch (error) {
                    Bs.log("error in METHOD:: callBackFunc() bruh..");
                    Bs.log("e ==> " + error);
                }

            });
    }



    static tryGetErrors(error) {
        let actualErrors = null;

        try {
            actualErrors = error.response.data.errors;
        } catch (error) {
            Bs.log("\n\n\n#####!!!!!#####");
            Bs.log("error in method:: tryGetErrors()..");
            Bs.log("error ==> " + error);
        }

        return actualErrors;
    }


    static defaultCallBackFunc(data, json) {
        Bs.log("\n\n\n###########@@@@@@@@@@@#########");
        Bs.log("AJAX-REQUEST:: " + data.ur);
        Bs.log("in method:: defaultCallBackFunc()");
    }


    static defaultErrorCallBackFunc(errors) {
        Bs.log("\n\n\n#####!!!!!#####");
        Bs.log("in method:: defaultErrorCallBackFunc()");
        Bs.log("Override this callback.");
    }




    static displayErrors(error) {

        if (error === null) { return; }
        Bs.log("\n\n\n#########################");
        Bs.log("in method:: displayErrors()");
        Bs.log("error ==> " + error);


        Bs.log("tangina shit");


        Bs.log("looping through object:: error...");
        for (const property in error) {
            if (error.hasOwnProperty(property)) {
                Bs.log(`${property}: ${error[property]}`);

            }

        }

        try {
            Bs.log(error.response);
        } catch (e) {
            Bs.log("error bruh ==> " + e);
        }

        try {
            Bs.log(error.response.data.message);
        } catch (e) {
            Bs.log("error bruh ==> " + e);
        }

        try {
            Bs.log(error.response.data.errors);
        } catch (e) {
            Bs.log("error bruh ==> " + e);
        }
    }


    static displayObjects(obj, objName) {

        Bs.log("\n\n\n#########################");
        Bs.log("in method:: displayObjects()");
        Bs.log("obj ==> " + objName);
        Bs.log(obj);
        Bs.log("looping through object:: " + objName);


        for (const property in obj) {
            Bs.log(`${property}: ${obj[property]}`);
        }
    }
}



export default BsCore;