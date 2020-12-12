import React, { Component } from 'react';
import './Profile.css';
import Header from './Header'
import { getUserbyUsername, checkSession } from "./actions/user" 
import App from '../../App'


class Information extends Component {
    constructor(props) {
        super(props);
        checkSession(this);
    }
     state = {
            reset: true,
            show: false,
            user: [],
            password: '',
            AddressShow: false,
            professionShow: false,
            currentUser: null
        };

    handlechange = (event) => {
        this.setState({password: event.target.value});
    }

    toggleshow = () => {
        this.setState({ hide: !this.state.hide});
    }

    componentDidMount() {
        getUserbyUsername(this, this.state.currentUser);
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

    onClickAddressButton = () => {
        this.setState({ AddressShow: !this.props.AddressShow });
    }

    onClickProfessionButton = () => {
        this.setState({ professionShow: !this.props.professionShow });
    }

    generateInfoTable = () => {
        let table = [];
        table.push(
        <tr>
          <th> Information </th>
          <th> Detail</th>
        </tr>
        );
        table.push(
        <tr> 
          <td> UserName </td>
          <td> {this.state.user.username}</td>
        </tr>
        );
        table.push(
        <tr>
          <td> E-mail </td>
          <td> {this.state.user.email}</td>
        </tr>
                );
        if (!this.AddressShow) {
        table.push(
        <tr>
          <td> Address </td>
          <td> <button name="password" onClick={(e) => this.onClickAddressButton()}>Add Address</button> </td>
        </tr>
                );
        } else {
            table.push(
             <tr>
          <td> Profession </td>
          <td> {this.state.user.email}</td>
        </tr>
            );
        }
        table.push(
             <tr>
          <td> Profession </td>
          <td> <button name="password" onClick={(e) => this.onClickProfessionButton()}>Add Professtion</button> </td>
        </tr>
            );
        table.push(
        <tr>
          <td> Posts Number </td>
          <td> {this.state.user.userPosts}</td>
        </tr>
        );
        return <table className="information-table"> {table.map(table => table)} </table>;
    }

    render() { 
        const { currentUser } = this.state;
        let button;
        return (
                <div className='Information'>      
                    {this.generateInfoTable()}
                <input className='information-button' onClick={this.hidecomp} type="submit" value="Reset Password" /> 
                </div>

        );
    }
}
    

 
export default Information;