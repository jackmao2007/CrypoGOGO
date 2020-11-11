// import React, { Component } from 'react';
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
// import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
// import Information from './Information'
// import Header from './Header'
// import MyWallet from './MyWallet'
// import User from './User'
// import List from './List'

// import './Profile.css';
// class Sidebar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       assets: [
//         {
//           open: true,
//           symbol: 'Home',
//           key: 1
//         },
//         {
//           open: false,
//           symbol: 'My Wallet',
//           key: 2
//         },
//         {
//           open: false,
//           symbol: "My Post",
//           key: 3
//         },
//         {
//           open: false,
//           symbol: "ManageUsers",
//           key: 4
//         },
//         {
//           open: false,
//           symbol: "ManagePosts",
//           key: 5
//         }
//       ],
//        curr: 'Home'
//     }
//   }

//     HandleClick = (i) => {
//       this.setState({ open : !this.state[i].open });
//     }

//     componentDidMount() {
//     if (this.props.open) {
//       this.setState({ curr: this.props.symbol});
//      }
//     }

//     render() { 
//       const { assets, curr } = this.state;
//       return ( 
//         <div className="sidebar">
//             <button onClick={() =>this.HandleClick(0)}>Home</button>
//             <div>
//                     <Header/>
//                     <Information/>
//             </div>
//             <button onClick={() =>this.HandleClick(1)}>My Wallet</button>
//             <div>
//                     <MyWallet/>
//             </div>
//             <Link to="/community"><button onClick={() =>this.HandleClick(2)}>My Post</button>
//               </Link>
//             <button onClick={() =>this.HandleClick(3)}>Manage Users</button>
//             <div>
//                     <List/>
//             </div>
//             <Link to="/community"><button onClick={() =>this.HandleClick(4)}>Manage Posts</button>
//             </Link>
//        </div>
//      );
//     }
//  }
 
// export default Sidebar;

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
            <a class="active" href="/Community">My Posts</a>
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

