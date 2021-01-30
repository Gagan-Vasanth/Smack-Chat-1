import { authConstants } from "../actions/authConstants";

const initialState = {
    firstName: '',
    secondName: '',
    email: '',
    authenticating: false,
    authenticated: false,
    error: null,
    online: false,
};

const reducer = (state=initialState, action) => {
    console.log(action);
    switch(action.type){
        case (`${authConstants.USER_LOGIN}_REQUEST`): return {
                ...state,
                authenticating: true
        };
        case (`${authConstants.USER_LOGIN}_SUCCESS`):
           
        return state= {
                ...state,
                ...action.payload.user,
                authenticating: false,
                authenticated: true,
                online: true,
        };  
        case (`${authConstants.USER_LOGIN}_FAILURE`): return {
                ...state,
                authenticated: false,
                authenticating: false,
                error: action.payload.error
        };
        case (`${authConstants.USER_LOGOUT}_REQUEST`): return state;
        case (`${authConstants.USER_LOGOUT}_SUCCESS`): return state={
            ...initialState,
            online: false,
        };
        case ( `${authConstants.USER_LOGOUT}_FAILURE`): return {
            ...state,
            error: action.payload.error
        }
        default: return state;
    }
}

export default reducer;