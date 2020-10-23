import React, { Component } from 'react';
import Navbar from "../Navbar/index";


class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar/>
                <p> "Hello Dashboard" </p>
            </div>
         );
    }
}
 
export default Dashboard;