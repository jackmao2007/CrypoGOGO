import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, useHistory} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Community from './components/Community';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Trading from './components/Trading';
import Admin from './components/Adminprofile'
import Signup from'./components/Login/Signup';
import Navbar from'./components/Navbar';

import { checkSession } from './actions/user';

class App extends Component {
  state = { 
    currentUser: null,
    isAdmin: false,
    loginStatus: false
  }

  checkLoginStatus() {
    // Check login on server with credentials
    let serverloggedIn = true; // hard coded
    if (serverloggedIn && this.state.loginStatus === false){
      this.setState({
        loginStatus: true
      })
    }
  }

  componentDidMount() {
    // this.checkLoginStatus();
    checkSession(this);
  }

  componentWillUnmount(){
    this.setState({
      loginStatus: false
    })
    // Logout user on server
  }

  render() { 
    return ( 
      <BrowserRouter>
      <Switch>
        <Route exact path='/sign-up'> <Signup/> </Route>
      </Switch>
      <div>
        {!this.state.loginStatus ? null: <Navbar app={this}/> }
      </div>
      <Switch>
        <Route exact path={['/','/sign-in','/dashboard']} render={ props => (
                        <div>
                        {!this.state.loginStatus ? <Login {...props} app={this} /> : <Dashboard/>}
                        </div>
        )}/>
        <Route exact path='/trading' render={ props => 
                        (<div>
                          {!this.state.loginStatus ? <Login {...props} app={this} /> : <Trading/>}
                          </div>)}/>
        <Route exact path='/community' render={ props => 
                        (<div>
                          {!this.state.loginStatus ? <Login {...props} app={this} /> : <Community {...props} app={this} />}
                          </div>)}/>
        <Route exact path='/adminprofile' render={ props => 
                        (<div>
                          {!this.state.loginStatus ? <Login {...props} app={this} /> : <Admin/>}
                          </div>)}/>                
      </Switch>
      </BrowserRouter>
     );
  }
}
 
export default App;