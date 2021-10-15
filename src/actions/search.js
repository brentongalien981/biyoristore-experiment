


/* NAMES */
export const SET_SEARCH_PHRASE = "SET_SEARCH_PHRASE";



/* FUNCS */
export const setSearchPhrase = (data) => ({ type: SET_SEARCH_PHRASE, data: data });



/* AJAX FUNCS */
// export const search = (data = {}) => {

//     return (dispatch) => {

//         BsCore2.ajaxCrud({
//             url: '/search',
//             callBackFunc: (requestData, json) => {
//                 const callBackData = { ...data, ...json };
//                 dispatch(onReadFeaturedProductsReturn(callBackData));
//             },
//             errorCallBackFunc: (errors, errorStatusCode) => {
//                 const callBackData = { ...data, errors: errors, errorStatusCode: errorStatusCode, isResultOk: false };
//                 dispatch(onReadFeaturedProductsReturn(callBackData));
//             }
//         });
//     };
// };