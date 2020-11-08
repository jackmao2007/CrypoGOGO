import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import Sidebar from "./Sidebar"

class Trading extends Component {
    state = {  }
    render() { 
        return ( 
                <div>
                    <Navbar/>
                    <Sidebar/>
                </div>
                );
    }
}
 
export default Trading;