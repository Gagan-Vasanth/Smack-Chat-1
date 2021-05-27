import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealTimeConversations, getRealTimeUser, updateMessage } from '../../actions/user.action';
import Layout from '../../components/Layout/Layout';
import './Home.css';


const Users = (props) => {


  const {user, onClick} = props;

 
  return (
             <div onClick={() => onClick(user)} className="displayName">
                <div className="displayPic">
                  <div id="profileImage">{user.firstName[0].toUpperCase()}{user.secondName[0].toUpperCase()}</div>
                </div>
                <div style={{display: 'flex',flex: 1, justifyContent:'space-between'  ,margin: '0 10px'}}>
                    <span style={{fontWeight: 500, color: 'white'}}>{user.firstName} {user.secondName}</span>
                      <span className={user.online ? `onlineStatus`: `onlineStatus off`}></span>
                </div>
            </div>
  );

}

const HomePage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector( state => state.auth);
  const users = useSelector( state => state.users);
  let unsubscribe;
  const [ chatStarted, setChartStarted] = useState(false);
  const [ chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid_2, setUserUid_2] = useState(null);

  useEffect( () => {
    unsubscribe =  dispatch(getRealTimeUser(auth.uid))
    .then( unsubscribe => {
      return unsubscribe;
    })
    .catch( error => console.log(error));
  },[]);

  //componentWillUnmount()

  useEffect( ()=> {
    return () => {
      // clear
      unsubscribe.then( f => f()).catch( error => console.log(error));
    }
  },[]);

  const initChat = (user) => {
    setChartStarted(true);
    setChatUser(`${user.firstName} ${user.secondName}`);
    setUserUid_2(user.uid);
    dispatch(getRealTimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
    
  }

  const submitMessageHandler = () => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid_2,
      message: message
    }
    console.log(msgObj);
    if(message !== ""){
      dispatch(updateMessage(msgObj));
      setMessage('');
    }
   
  }

  return (
    <Layout >
    <section className="container">
      <div className="listOfUsers">

      { users.users.length > 0 ?
        users.users.map( user => {
            return (
              <Users  key={user.uid} user={user} onClick={initChat}/>
            );
        }) : null}
                
    </div>
    <div className="chatArea">
        <div className="chatHeader"> {chatStarted ? chatUser: ''} </div>
        <div className="messageSections">

            { chatStarted 
            ? users.conversations.map( con => 
                    <div style={{ textAlign: auth.uid == con.user_uid_1 ? 'right': 'left' }}>
                                 <p className="messageStyle">{con.message}</p>
                    </div>
            ) : null}

        </div>
        { chatStarted ? <div className="chatControls">
                            <textarea 
                            className='textfield'
                              value={message}
                              onChange={(e)=> setMessage(e.target.value)}
                            />
                          <button 
                          className='button_1'
                          onClick={submitMessageHandler} disabled={ message === '' ? true: false}>Send</button>
                       </div>: null}
      </div>
    </section>
  </Layout>
  );
}

export default HomePage;
