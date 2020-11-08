 import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BTC from "./BTC"
import './styles.css'
import ETC from "./ETC"


const routes = [
  {
    path: "/ETC",
    exact: true,
    main: () => <div>
                  <ETC/>
                </div>
  },
  {
    path: "/BTC",
    main: () => <div>
                   <BTC/>
                </div>
  }
];

class Sidebar extends Component {
    render() { 
        return ( 
    <Router>
      <div style={{ display: "flex" }}>
        <div className="sidebar">
            <input type="text" id="mySearch" placeholder="Search.." title="Type in a Bitcoin"/>
            <ul>
            <li>
              <Link to="/ETC">
              <span className='header'>ETC </span> <span className='subheader'> 1134.23</span>
              <h6> <span style={{color:"grey"}}> Bitcoin</span> <span style={{color:"green"}}> +123 </span> </h6>
              </Link>
            </li>
            <li>
              <Link to="/BTC">
              <span className='header'>BTC </span> <span className='subheader'> 1099.77</span>
              <h6> <span style={{color:"grey"}}> Bitcoin</span> <span style={{color:"red"}}> -7.9 </span> </h6>
              </Link>
            </li>
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
