import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import './Profile.css';
import Sidebar from './Content'
import Information from './Information'
import Header from './Header'
import List from './List'

class Admin extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Navbar/>
                <Header/>
                <Information/>
                <Sidebar/>
                <list/>

            </div>
         );
    }
}
 
export default Admin;