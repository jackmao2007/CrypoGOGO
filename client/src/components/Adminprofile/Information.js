import React, { Component } from 'react';
import './Profile.css';

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            password: 'aaaaaa', 
            //Will be the Values from the users in the backend
            reset: false
        };
        this.handlechange = this.handlechange.bind(this);
        this.toggleshow = this.toggleshow.bind(this);
    }

    sumbit = () => {
        if (window.confirm('DO YOU WANT TO LOG OUT?')){
            alert('Sign out success');
            window.location="/sign-in";
        } else {
            alert('Sign out fail');
        } 
    }

    handlechange = (event) => {
        this.setState({password: event.target.value});
    }

    toggleshow = () => {
        this.setState({ hide: !this.state.hide});
    }

    componentDidMount() {
        if (!this.props.hide) {
            this.setState({ password: this.props.password });
        }
    }

    hidecomp = () => {
        this.setState({ reset: !this.props.reset });
    }

    render() { 
        const reset = this.state.reset;
        let button;
        return (
                <div className='Information'>       
                <p> Username: jjjjj123</p>
                <p> E-mail: jjjjj123@gmail.com</p>
                { /* In backend, the password is hidden. */}
                <p> Password: <input type={this.state.hide ? 'password' : ''} 
                    value={this.state.password} 
                    onChange = {this.handlechange}
                /> <button onClick={this.toggleshow}>Show</button>
                </p>
                <p> Profession: Teacher</p>
                <p> Address: 40 Willcocks Street</p>
                <p> Posts Number: 156</p>

                <input onClick={this.sumbit} type="submit" value="Log out" />  
                <input onClick={this.hidecomp} type="submit" value="Reset Password" /> 
                </div>

        );
    }
}
    

 
export default Information;