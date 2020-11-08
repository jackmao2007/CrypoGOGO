import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import './Profile.css';
import Sidebar from './Content'
import Information from './Information'
import Header from './Header'

class Profile extends Component {
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
 
export default Profile;