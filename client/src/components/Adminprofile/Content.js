 import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Information from './Information'
import Header from './Header'
import MyWallet from './MyWallet'
import User from './User'
import List from './List'

import './Profile.css';


const routes = [
  {
    path: "/home",
    exact: true,
    main: () => <div>
                    <Header/>
                    <Information/>
                </div>
  },
  {
    path: '/MyWallet',
    main: () => <div>
                    <MyWallet/>
                </div>
  },
  {
    path: '/ManageUser',
    main: () => <div>
                    <List/>
                </div>

  }

];

class Sidebar extends Component {
    render() { 
        return ( 
    <Router>
      <div style={{ display: "flex" }}>
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/MyWallet">My Wallet</Link>
            </li>
            <li>
              <Link to="/ManageUser">Manage Users</Link>
            </li>
            <a class="active" href="/Community">Manage Posts</a>
          </ul>

        </div>
        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );    
    }
}
 
 export default Sidebar;
