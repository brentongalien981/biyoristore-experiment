import { SET_SEARCH_PHRASE } from "../actions/search";


/** CONSTS */

/* INITIAL STATE */
const initialState = {
    searchPhrase: ''
};



/* REDUCER */
const search = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_PHRASE: return setSearchPhrase(state, action);
        default: return state;
    }
}



/* NORMAL */
const setSearchPhrase = (state, action) => {

    return {
        ...state,
        searchPhrase: action.data.searchPhrase
    };
};




export default search;