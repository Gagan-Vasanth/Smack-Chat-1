import { userConstants } from "./userConstants";
import firebase from 'firebase';

export const getRealTimeUser = (uid) => {
    return async dispatch => {
        dispatch( { type: `${userConstants.GET_REAL_TIME_USERS}_REQUEST`});

        const db = firebase.firestore();

        const unsubscribe = db.collection('users')
        .onSnapshot( (snapshot) => {
            const usersList = [];
            snapshot.forEach( doc => {
                if(doc.data().uid !== uid){
                    usersList.push(doc.data());
                }
            });
            dispatch({ type: `${userConstants.GET_REAL_TIME_USERS}_SUCCESS`, payload: {users: usersList}});
            console.log("Current Users in Collection", usersList);
        })
        return unsubscribe;

    }
}

export const updateMessage = (msgObj) => {
    return async dispatch => {
        const db = firebase.firestore();
        db.collection('conversations')
        .add({
            ...msgObj,
            isView: false,
            createdAt: new Date()
        })
        .then ( data => {
            console.log(data);
        })
        .catch( error => {
            console.log(error);
        })
    }
}

export const getRealTimeConversations = (user) => {
    return async dispatch => {

        const db = firebase.firestore();
        db.collection('conversations')
        .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
        .orderBy('createdAt', 'asc')
        .onSnapshot( snapshot => {
            const conversations = [];
            snapshot.forEach( doc => {
                
                if(
                    (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                    ||
                    (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                  ){
                      conversations.push(doc.data());
                      console.log(conversations);
                  }

                  if(conversations.length > 0){
                        dispatch({
                            type: userConstants.GET_REAL_TIME_CONVERSATIONS,
                            payload: {conversations: conversations}
                        })
                  } 
                  else{
                    dispatch({
                        type: `${userConstants.GET_REAL_TIME_CONVERSATIONS}_FAILURE`,
                        payload: {conversations}
                    })
                  }
            })
            console.log(conversations);
        })

    }
}