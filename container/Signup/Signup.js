import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/UI/Card/Card';
import './Signup.css';
import { signup } from '../../actions/auth.action';
import { Redirect }  from 'react-router-dom';
/**
* @author
* @function Signup
**/

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const user = {
      firstName, secondName, email, password
    };
    dispatch(signup(user));
  }

  if(auth.authenticated){
    console.log(auth);
    return (<Redirect to="/" />);
  }

  return(
    <Layout>
      <div className="heading_login"> SignUp into Smack Chat</div>
       <div className="signup">
       <Card>
        
          <form onSubmit={formSubmitHandler}>

                  <input
                   name="firstName"
                   type="text"
                   onChange={ (e) => setFirstName(e.target.value)} 
                   placeholder="First Name"
                   value={firstName}
                   className="email"
                   />
                  <input
                   name="secondName"
                   type="text"
                   onChange={ (e) => setSecondName(e.target.value)} 
                   placeholder="Second Name"
                   value={secondName}
                   className='email'
                   />

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
                    >Sign up
                    </button>
           </form>
          
        </Card>
        </div>
    </Layout>
   )

 }

export default Signup;