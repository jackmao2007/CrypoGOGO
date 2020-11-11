import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./styles.css";


class Navbar extends Component {
    constructor(props) {
        super(props);
    }
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
                    {
                        this.props.loginStatus?
                        null
                        :<Link to="/sign-in">
                            <button className='right-nav-button'> Logout </button>
                        </Link>
                    }
                </nav>
            </div>
         );
    }
}
 
export default Navbar;