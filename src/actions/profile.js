import BsCore from "../bs-library/helpers/BsCore";
import Bs from "../bs-library/helpers/Bs";
import BsAppSession from "../bs-library/helpers/BsAppSession";



/* NAMES */
export const SET_PROFILE = "SET_PROFILE";



/* FUNCS */
export const setProfile = (profile) => ({ type: SET_PROFILE, profile: profile });



/* AJAX FUNCS */
export const readProfile = (userId) => {

    Bs.log("\n###############");
    Bs.log("In REDUCER: join, METHOD: readProfile()");

    Bs.log("apiToken ==> " + BsAppSession.get("apiToken"));


    return (dispatch) => {

        BsCore.ajaxCrud({
            url: '/profile/show',
            params: { userId: userId, api_token: BsAppSession.get("apiToken") },
            neededResponseParams: ["profile"],
            callBackFunc: (requestData, json) => {
                Bs.log("\n#####################");
                Bs.log("FILE: actions/join.js, METHOD: readProfile() => ajaxCrud() => callBackFunc()");

                dispatch(setProfile(json.profile));
            }
        });
    };
};