import React, { Component } from 'react';
import Navbar from "../Navbar/index";

class Profile extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Navbar/>
                <p> "Hello Profile" </p>
            </div>
         );
    }
}
 
export default Profile;