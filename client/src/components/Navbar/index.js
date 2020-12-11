import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/user'

import "./styles.css";


class Navbar extends Component {
    logoutUser = (app) => {
        logout(app);
    };

    render() { 
        const { app } = this.props
        return ( 
            <div >
                <nav className='main-nav'>
                    <Link to="/">
                        <button className='main-nav-button'> Home </button>
                    </Link>
                    <Link to="/trading">
                        <button className='main-nav-button'> Trading </button>
                    </Link>
                    <Link to="/community">
                        <button className='main-nav-button'> Community </button>
                    </Link>
                    <Link to="/adminprofile">
                        <button className='main-nav-button'> AdminProfile </button>
                    </Link>
                    <button onClick={() => this.logoutUser(app)} className='right-nav-button'> Logout </button>
                </nav>
            </div>
         );
    }
}
 
export default Navbar;