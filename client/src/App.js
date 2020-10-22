import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Community from './components/Community';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import Trading from './components/Trading';

class App extends Component {
  state = { 
    loginStatus: false
  }

  checkLoginStatus() {
    // Check login on server with credentials
    let serverloggedIn = false; // hard coded
    if (serverloggedIn && this.state.loginStatus === false){
      this.setState({
        loginStatus: true
      })
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
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
        <Route exact path='/' render={() =>
                         (this.state.loginStatus? <Dashboard/> : <Login/>)}/>
        <Route exact path='/profile' render={() => 
                        (<Profile />)}/>
        <Route exact path='/trading' render={() => 
                        (<Trading />)}/>
        <Route exact path='/community' render={() => 
                        (<Community />)}/>
      </Switch>
      </BrowserRouter>
     );
  }
}
 
export default App;