import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { withRouter } from 'react-router-dom'
import Navbar from "../Navbar/index";
import './styles.css'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', passwordrep: ''};
    }

    handleChange(key,val){
        this.setState({
            [key]: val
        })
    }

    check = () =>{
        if (this.state.password === this.state.passwordrep) {
            alert('Same password');
            return true
        } else {
            alert('Different password');
            return false
        }
    }

    clickHandler = () =>{
        alert('Username is ' + this.state.username + '\nPassword is ' + this.state.password);
        if (this.state.password === this.state.passwordrep) {
            alert('Sign up successfully');
            //this.props.history.push('/sign-in')
        } else {
            alert('Fail to sign up, different password');
        }
    }

    render() { 
        return (
        <div>
            <Navbar />
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>

                        {/* <div className="form-group">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div> */}

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" onChange={(v)=>this.handleChange('username',v.target.value)} className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" onChange={(v)=>this.handleChange('password',v.target.value)} className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" onChange={(v)=>this.handleChange('passwordrep',v.target.value)} className="form-control" placeholder="Enter password again" />
                        </div>
                    
                    <button type='button' onClick={this.check}>check</button>
                    <button type="button" onClick={this.clickHandler} className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="./sign-in">sign in?</a>
                    </p>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default Signup;