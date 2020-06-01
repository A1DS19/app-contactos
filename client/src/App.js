import React, { Fragment } from 'react';
import { Navbar } from './Components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Components/layout/Footer';
import { Home } from './Components/Pages/Home';
import { About } from './Components/Pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import Alerts from './Components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './Components/routing/PrivateRoute';
import './App.css';

if (localStorage.token) {
  console.log('Token existe home');

  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
