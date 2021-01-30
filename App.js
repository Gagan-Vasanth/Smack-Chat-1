import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './container/Home/Home';
import Login from './container/Login/Login';
import Signup from './container/Signup/Signup';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInUser } from './actions/auth.action';


function App() {

  const auth = useSelector( state => state.auth );
  const dispatch = useDispatch();

  useEffect( () => {
    console.log('Okkkk')
    if(!auth.authenticated){
      console.log('Checking');
      dispatch(isLoggedInUser());
    }
  },[]);

  return (
    <div className="App">
      <Router>
      
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/Signup' component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
