import firebase from 'firebase';
import { authConstants } from './authConstants';

export const signup = (user) => {

    return async (dispatch) => {
        const db = firebase.firestore();

        dispatch({type: `${authConstants.USER_LOGIN}_REQUEST`});
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password) // database -- user
        .then( data => {
            console.log(data);
            const currentUser = firebase.auth().currentUser;
            const name = `${user.firstName} ${user.secondName}`;

            currentUser.updateProfile({
                displayName: name
            }).then( () => {
                db.collection('users')
                .doc(data.user.uid)
                .set({
                    firstName: user.firstName,
                    secondName: user.secondName,
                    uid: data.user.uid,
                    createdAt: new Date(),
                    online: true
                }).then( () => {
                    const loggedInUser = {
                        firstName: user.firstName,
                        secondName: user.secondName,
                        uid: data.user.uid,
                        email: user.email
                    }
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
                    console.log("User logged in successfully");
                    dispatch({ type: `${authConstants.USER_LOGIN}_SUCCESS`, payload: { user: loggedInUser}});
                }).catch( (err) =>{
                    console.log(err);
                    dispatch({ type: `${authConstants.USER_LOGIN}_FAILURE`, payload: { error: err}});
                } );
            }).catch( err => console.log(err));
        })
        .catch( err => alert(err.message));
    };
};

export const signin = ({email, password}) => {
    return async dispatch => {
        dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST`});
        console.log(email);
        const db = firebase.firestore();

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( (data) => {
            console.log(data);
           const name = data.user.displayName.split(" ");
           const firstName = name[0];
           const secondName = name[1];
            
           db.collection('users').doc(data.user.uid).update({
               online: true
           }).then( () => {
            const loggedInUser = {
                firstName: firstName,
                secondName: secondName,
                uid: data.user.uid,
                email: data.user.email
             }
    
             localStorage.setItem('user', JSON.stringify(loggedInUser));  
             dispatch({type: `${authConstants.USER_LOGIN}_SUCCESS` , payload: {user: loggedInUser} } ) ;
           }).catch( err => console.log('Hello Error' + err)); 
        })
        .catch( (err) => {
            alert(err.message);
        });
    };
};

export const isLoggedInUser = () => {
    return async dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        console.log(user);
        if(user){
            console.log(user);
            dispatch({type: `${authConstants.USER_LOGIN}_SUCCESS` , payload: {user: user} }  ) ;
        }

        else {
             dispatch({type: `${authConstants.USER_LOGIN}_FAILURE` , payload: {error : 'Failed to login'} }  ) ;
        }
    }
};

export const logout = (uid) => {
    return async dispatch => {
        dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });

        const db = firebase.firestore();
        db.collection('users')
        .doc(uid)
        .update({
            online: false
        })
        .then( () => {
            firebase.auth().signOut()
                    .then( () => {
                        localStorage.clear();
                        dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS`});
                    })
                    .catch( (err) => {
                        console.log(err);
                        dispatch({ type: `${authConstants.USER_LOGOUT}_FAILURE`, payload: {error: err
                        }});
                })
            })
        .catch( err => {
            console.log(err);
        })
        
    }
};

export const reset_password = () => {
    return async dispatch => {
        var user = firebase.auth().currentUser;
        var newPassword = prompt('Please Enter a new Password');

        user.updatePassword(newPassword)
        .then( () => {
            alert('Password Updated Successfully');
        })
        .catch( err => {
            alert(err);
        })
    }
}