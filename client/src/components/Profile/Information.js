import React, { Component } from 'react';
import './Profile.css';

class Information extends Component {
    state = {    
    }
    render() { 
        return (
            <div class = "Information">              
                <p> Email Address: asdfiaoono@gmail.com </p>
                <p> Password: name </p>
                <p> Balance: 200000</p>
                <p> Profit: 10000 </p>
                <p> Loss: 1440 </p>
                <input type="submit" value="Log out" />
                <input type="submit" value="Change Password" />
            </div>
         );
    }
}
 
export default Information;