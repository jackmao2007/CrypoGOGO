 import React, { Component } from 'react';
import './Profile.css';
import { Redirect } from "react-router";

class List extends Component {
    constructor(props) {
      super(props);
    this.state = { 
      users: [
      {userid: 1, username: 'AA'},
      {userid: 2, username: 'BB'},
      {userid: 3, username: 'CC'}
      ],
      searchid: 7
      //Will be the Values from the Admins in the backend
      }
      this.deleteAccount = this.deleteAccount.bind(this);
      this.searchAccount = this.searchAccount.bind(this);

    }

    searchAccount = (id) => {
      const usersinfo = this.state.users
      let found = this.state.users.filter(s => {
        return s.userid === id });
      this.setState({ usersinfo: found});
    }

    deleteAccount = (user)  => {
      let removed = this.state.users.filter(user => {
        return user !== user});
      this.setState({ usersinfo: removed});
    }

    generateUserTableRows = () => {
      const usersinfo = this.state.users
      let tableRows = [];
      tableRows.push(
       <tr>
          <th> UserId </th>
          <th> UserName </th>
          <th> AddAdmin </th>
          <th> ManageAccount </th>
      </tr>
      );
      for (let i = 0; i < usersinfo.length; i++){
        tableRows.push(
          <tr> 
            <td> {usersinfo[i].userid} </td>
            <td> {usersinfo[i].username} </td>
            <td> {<button className='AddAdmin'>Set Administrator</button>} </td>
            <td> {<button className='Delete' onClick={() => this.deleteAccount(usersinfo[i])}>Delete Account</button>}  </td>
          </tr>
        );
      }
      return <table className="user-table"> {tableRows.map(tableRows => tableRows)} </table>;
        }

      generateSearchTableRows = () => {
      let tableRows = [];
      tableRows.push(
       <tr>
          <th> UserId </th>
          <th> UserName </th>
      </tr>
      );
        tableRows.push(
          <tr> 
            <td> 7 </td>
            <td> Jane </td>
          </tr>
        );

      return <table className="search-table"> {tableRows.map(tableRows => tableRows)} </table>;
    }

    render() { 
        return ( 
                <div className="list">
                 <div className="search">
                  <p>Search User By ID</p>
                  <input 
                    type="text" 
                    value={this.state.searchid} 
                    placeholder="Search ID" 
                  />
                  <button onClick={(e) =>  this.searchAccount(e.target.value)}> Search</button>
                  {this.generateSearchTableRows()}
                                    </div>
                  {this.generateUserTableRows ()}
                </div>
        );
    }
}

 
export default List;