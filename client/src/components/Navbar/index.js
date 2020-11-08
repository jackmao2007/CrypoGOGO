import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./styles.css";


class Navbar extends Component {
    state = {  }
    render() { 
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
                    <Link to="/profile">
                        <button className='main-nav-button'> UserProfile</button>
                    </Link>
                    <Link to="/adminprofile">
                        <button className='main-nav-button'> AdminProfile </button>
                    </Link>
                    <Link to="/sign-in">
                        <button className='main-nav-button'> Log In </button>
                    </Link>
                    <Link to="/sign-up">
                        <button className='main-nav-button'> Sign Up </button>
                    </Link>
                </nav>
            </div>
         );
    }
}
 
export default Navbar;