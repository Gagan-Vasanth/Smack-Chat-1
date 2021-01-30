import { userConstants } from "../actions/userConstants";

const initialState = {
    users: [],
    conversations: []
};

export default (state=initialState, action) => {
   switch(action.type){
       case `${userConstants.GET_REAL_TIME_USERS}_REQUEST`: return state;
       case  `${userConstants.GET_REAL_TIME_USERS}_SUCCESS`: return {
           ...state,
           users: action.payload.users
       };
       case `${userConstants.GET_REAL_TIME_USERS}_FAILURE`: break;
       case userConstants.GET_REAL_TIME_CONVERSATIONS : return{
           ...state,
           conversations: action.payload.conversations
       }
       case `${userConstants.GET_REAL_TIME_CONVERSATIONS}_FAILURE`: return {
           ...state,
           conversations: []
       };
       default: return state;
   }
}