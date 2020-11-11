 import React, { Component } from 'react';
import './Profile.css';

class List extends Component {
    constructor(props) {
      super(props);
    this.state = { 
      users: [
      {userid: 1, username: 'AA'},
      {userid: 2, username: 'BB'},
      {userid: 3, username: 'CC'}
      ],
      totalusers: 3
      }
    }

    getActivities() {
    }

    componentDidMount() {
        this.getActivities();
    }
    searchAccount = (id) => {
      const usersinfo = this.state.users
      let found = this.state.users.filter(s => {
        return s.userid === id });
      this.setState({ usersinfo: found});
    }

    deleteAccount = (user)  => {
      const usersinfo = this.state.users
      let removed = this.state.users.filter(s => {
        return s.userid !== user.userid });
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
            <td> <button class='AddAdmin'>Add Administrator</button> </td>
            <td> <button class='Delete'
            onClick={() =>this.deleteAccount(usersinfo[i])}>Delete Account</button>  </td>
          </tr>
        );
      }
      return <table className="dashboard-account-table"> {tableRows.map(tableRows => tableRows)} </table>;
    }

    render() { 
        return ( 
                <div className="Usertable">
                  <p>Search User By ID</p>
                  <input 
                    type="text" 
                    placeholder="Search ID" 
                    className = "input"
                    onChange={(e) =>  this.searchAccount(e.target.value)}
                    />
                  {this.generateUserTableRows ()}
                </div>
        );
    }
}

 
export default List;