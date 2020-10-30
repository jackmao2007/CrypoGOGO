import React, { Component } from 'react';
import './Profile.css';


class Header extends Component {
    state = {    
    }
    render() { 
        return (
            <div class="ProfileCirclecontainer">             
            	<img src="profile.jpeg" className='ProfileCircle'/>
            </div>
         );
    }
}
 
export default Header;