import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signin } from '../../actions/auth.action';
import Layout from '../../components/Layout/Layout'
import Card from '../../components/UI/Card/Card';
import './Login.css';

/**
* @author
* @function Login
**/

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    if(email == ""){
      alert('Please Fill the Email');
      return;
    }
    if(password == ""){
      alert('Please Fill the Password');
      return;
    }
    console.log(email);
    dispatch(signin({email, password}));

  };

  if(auth.authenticated){
    console.log(auth);
    return (<Redirect to="/" />);
  }
  

  return(
    <Layout>
      <div className="heading_login"> Login into Smack Chat</div>
        <div className="login">
          
           <Card>
               <form onSubmit={formSubmitHandler}>

                  <input
                   name="email"
                   type="email"
                   onChange={ (e) => setEmail(e.target.value)} 
                   placeholder="Enter your Email"
                   value={email}
                   className='email'
                   />

                   <input
                   name="password"
                   type="password"
                   onChange={ (e) => setPassword(e.target.value)} 
                   placeholder="Enter your Password"
                   value={password}
                   className='password'
                   />

                   <button 
                    type="submit"
                    className='button'
                    >Login
                    </button>
               </form>
            </Card> 
        </div>
    </Layout>
   )

 }

export default Login