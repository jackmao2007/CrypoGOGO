import React, { Component } from 'react';
import './Profile.css';

class Information extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {Email: '', password: '',};
    // }
    
    // handleChange(key,val){
    //     this.setState({
    //         [key]: val
    //     })
    // }

    sumbit = () => {
        if (window.confirm('DO YOU WANT TO LOG OUT?')){
            alert('Sign out success');
            window.location="/sign-in";
        } else {
            alert('Sign out fail');
        } 
    }

    change = () => {
        window.prompt("New Password");
    }

    render() { 
        return (
            <div className='Information'>       
                <p> Username: jjjjj123@gmail.com</p>
                <p> Password: jjjj123 <input onClick={this.change} type="submit" value="Change Password" /></p>
                <input onClick={this.sumbit} type="submit" value="Log out" />
            </div>
         );
    }
}
 
export default Information;