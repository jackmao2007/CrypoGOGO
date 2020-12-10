import React, { Component } from 'react';
import './Profile.css';
import Header from './Header'

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            show: false,
            password: ''
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


    inputChange = (e) => {
      this.setState({
            [this.state.searchid]: e.target.value
      });
    }

    updatePassword = (formComp, field) => {
        const value = field.value;
        const name = field.name;

        formComp.setState({
            [name]: value
        });
    };

    onClick = () => {
        this.setState({ show: !this.props.show });
    }

    Resetpasswordbox = () => {
        if (!this.state.show) {
        return <table className="user-table">          
               <input name="ResetPassword"
                        onChange= {(e) => this.inputChange(e)}
                        label="Student Name"
               /> 
               <button name="password" onClick={(e) => this.updatePassword(this, e.target)}>Show</button>
               </table>;
      }
    }


    render() { 
        const reset = this.state.reset;
        let button;
        return (
                <div className='Information'>   
                <table className="information-table"> 
                <tr>
                <th> Information </th>
                <th> Detail</th>  
                <td> UserName </td>
                <td> E-mail </td>
                <td> Password </td>
                <td> Profession </td>
                <td> Address </td>
                <td> Total Posts Number </td>
                </tr>
                 <tr>
                        <td> {this.props.username} </td>
                        <td> {this.props.email} </td>
                        <td> <input type={this.state.hide ? 'password' : ''} 
                    value={this.props.password} 
                    onChange = {this.handlechange}
                /> <button onClick={this.toggleshow}>Show</button></td>
                        <td> {this.props.profession} </td>
                        <td> {this.props.Address} </td>
                        <td> {this.props.userPosts} </td>
                    </tr>
                </table> 
                <input className='information-button' onClick={(e) => this.onClick()} type="submit" value="Reset Password" />
                </div>

        );
    }
}
    

 
export default Information;