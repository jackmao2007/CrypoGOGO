import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

import { signup } from '../../../actions/user'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', passwordrep: '', email: ''};
    }

    handleChange(key,val){
        this.setState({
            [key]: val
        })
    }


    clickHandler = () =>{
        if (this.state.password === this.state.passwordrep) {
            if (this.state.email.indexOf("@") > 0 && this.state.email.indexOf(".com") > 0) {
                //server call to add new User to backend database
                signup(this)
            } else {
                alert('Please enter correct email!')
            }
        } else {
            alert('Fail to sign up, different password!');
        };

    }

    render() { 
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" onChange={(v)=>this.handleChange('email',v.target.value)} className="form-control" placeholder="Enter your email" />
                        </div>

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

                    {/* <button type="submit" onClick={this.clickHandler} className="btn btn-primary btn-block">Sign Up</button> */}
                    <button type="button" onClick={this.clickHandler} className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="./sign-in">sign in?</a>
                    </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;