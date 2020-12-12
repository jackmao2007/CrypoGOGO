 import React, { Component } from 'react';
import './Profile.css';
import { Redirect } from "react-router";
import { getUsers, deleteAccount } from "./actions/user" 

class List extends Component {
    // constructor(props) {
    //   super(props);
    state = {
      userList: [],
      accountList: [],
      searchname: '',
      tableshow: false
    }

    componentDidMount() {
        getUsers(this);
    }


   setAdmin = (isAdmin) => {
      isAdmin = !isAdmin;
   }



    generateUserTableRows = () => {
      let tableRows = [];
      tableRows.push(
       <tr>
          <th> UserEmail </th>
          <th> UserName </th>
          <th> AddAdmin </th>
          <th> ManageAccount </th>
      </tr>
      );
      {this.displayUsers(this.state.userList)};
      if (!this.state.tableshow) {
        return <table className="user-table"> {tableRows.map(tableRows => tableRows)} </table>;
      }
    }

    generateSearchTableRows = (id) => {
      const usersinfo = this.state.userList;
      let tableRows = [];
      tableRows.push(
       <tr>
          <th> UserEmail </th>
          <th> UserName </th>
          <th> AddAdmin </th>
          <th> ManageAccount </th>
      </tr>
      );
      for (let i = 0; i < this.state.userList.length; i++){
        if (usersinfo[i].username === this.state.searchname) {
          tableRows.push(
          <tr> 
            <td> {usersinfo[i].email} </td>
            <td> {usersinfo[i].username} </td>
            <td> {<button className='AddAdmin'>Set Administrator</button>} </td>
            <td> {<button className='Delete' onClick={() => this.deleteAccount(usersinfo[i].username, this.props)}>Delete Account</button>}  </td>
          </tr>
        );
      }
      }
      if (this.state.tableshow) {
        return <table className="search-table"> {tableRows.map(tableRows => tableRows)} </table>;
      }
    }
    

    onClick = () => {
        this.setState({ tableshow: !this.props.tableshow });
    }

    inputChange = (e) => {
      this.setState({
            [this.state.searchname]: e.target.value
      });
    }

    displayUsers = (users) => {
      const { dashboard } = this.props;
      return users.map((user) => (
            <tr>
            <td> {user.email} </td>
            <td> {user.username} </td>
            <td> {<button className='AddAdmin' onClick={() => this.setAdmin(user.isAdmin)}>Set Administrator</button>} </td>
            <td> {<button className='Delete' onClick={() => deleteAccount(user.username, this.props)}>Delete Account</button>}  </td> 
            </tr>
      ))
    }
    

    render() { 
        return ( 
                <div className="list">
                 <div className="search">
                  <p>Search User By ID</p>
                  <input 
                    type="text" 
                    placeholder="Search ID" 
                    onChange= {(e) => this.inputChange(e)}/>
                  <button onClick={(e) => this.onClick()}> Search</button>
                  {this.generateSearchTableRows(this.state.searchid)}
                                    </div>
                  {this.generateUserTableRows ()}
                </div>
                      
        );
    }
}

 
export default List;