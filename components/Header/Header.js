import React from 'react';
import './Header.css';

import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset_password } from '../../actions/auth.action';

/**
* @author
* @function Header
**/

const Header = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

  return(
    <header className="header">
        <div style={{display: 'flex'}}>
        <div className="logo">Smack Chat</div>
            { auth.authenticated ? null: <ul className="leftMenu">
                                            <li><NavLink to={'/login'}>Login</NavLink></li>
                                            <li><NavLink to={'/signup'}>Sign up</NavLink></li>
                                        </ul>  }
        </div>
        <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>{ auth.authenticated? `Hi ${auth.firstName}`: null}</div>
         <ul className="menu">
            <li>
            { auth.authenticated ? <div><Link to={'#'} onClick={ () => {
              dispatch(logout(auth.uid))
            }}
            style={{color: 'yellow'}}
            >LOGOUT ||</Link>
              <Link to={'#'} onClick={ () => {
                  dispatch(reset_password());
              }}
              style={{ color: 'yellow'}}
              >  RESET PASSWORD  </Link>
            </div>: null}
             </li> 
         </ul>
    </header>
   );

 }

export default Header;