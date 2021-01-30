import React from 'react';
import Header from '../Header/Header';
import './Layout.css';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <div className="layout">
        <Header />
        <div className='children'>
        {props.children}
        </div>
    </div>
   );

 };

export default Layout;