import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

//harcode users
const users = [
    {username: 'user', password: 'user', email: 'user@user.com'},
    {username: 'admin', password: 'admin', email: 'admin@admin.com'}
]


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {users: users, username: '', password: ''};
    }

    handleChange(key,val){
        this.setState({
            [key]: val
        })
    }

    sumbit = () => {
        // Will be modified to server call for authentication in Phase2
        var i = 0;
        var len = this.state.users.length;
        var valid = false;
        for (; i < len; i++) {
            if (this.state.users[i].username === this.state.username && this.state.users[i].password === this.state.password) {
                valid = true;
            }
        }
        if (valid) {
            alert("Log in successfully");
            window.location.pathname = '/'
        } else {
            alert("Wrong username or password")
        }
    }



    render() { 
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" onChange={(v)=>this.handleChange('username',v.target.value)} className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" onChange={(v)=>this.handleChange('password',v.target.value)} className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                {/* Functionality will be implemented in Phase2 */}
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="button" onClick={this.sumbit} className="btn btn-primary btn-block">Sign In</button>
                        
                    </form>
                </div>
            </div>
        );
    }
}

 
export default Login;