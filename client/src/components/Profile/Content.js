import React, { Component } from 'react';
import './Profile.css';
import Header from './Header'
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class Sidebar extends Component {
    state = { 
       
    }
    render() { 
        return (      
            <div class="sidebar">
                <a class="active" href="#My Wallet">My Wallet</a>
                <a class="active" href="#My Posts">My post</a>
                <a class="active" href="Add adminstrator">Add adminstrator</a>
                <a class="active" href="Delete User">Delete User</a>
                <a class="active" href="Lock Post">Lock Post</a>
                <a class="active" href="Highlight Post">Highlight Post</a>
                <a class="active" href="delete Post">delete Post</a>
            </div>
         );
    }
}
 
export default Sidebar;