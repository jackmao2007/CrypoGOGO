 import React, { Component } from 'react';
import './Profile.css';
import { Redirect } from "react-router";

class List extends Component {
    constructor(props) {
      super(props);
    this.state = {
      userList: [],
      accountList: [],
      searchid: 1,
      tableshow: false
    }
      }

      
    // }

    // searchAccount = (id) => {
    //   const usersinfo = this.state.users
    //   let found = this.state.users.filter(s => {
    //     return s.userid === id });
    //   this.setState({ usersinfo: found});
    // }
    getUsers = () => {
      // the URL for the request
      const url = "/api/accounts";

      // Since this is a GET request, simply call fetch on the URL
      fetch(url)
          .then(res => {
              if (res.status === 200) {
                  // return a promise that resolves with the JSON body
                  return res.json();
                  console.log(0)
              } else {
                  alert("Could not get users");
              }
          })
          .then(json=> {
              // the resolved promise with the JSON body
               this.setState({ userList: json.users });
          })
          .catch(error => {
              console.log(error);
          });
   };

   getAccounts = (accountList) => {
      //  the URL for the request
      const url = "/api/accounts";

      // Since this is a GET request, simply call fetch on the URL
      fetch(url)
          .then(res => {
              if (res.status === 200) {
                  // return a promise that resolves with the JSON body
                  return res.json();
              } else {
                  alert("Could not get users");
              }
          })
          .then(json => {
              // the resolved promise with the JSON body
              accountList.setState({ accountList: json.accounts });
          })
          .catch(error => {
              console.log(error);
          });
   };

   setAdmin = (isAdmin) => {
      isAdmin = !isAdmin;
   }

   deteleAccount = (id, dashboardComp) => {
        const url = "/api/accounts/";
        const request = new Request(url + id, {
            method: "delete",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
        });

        // Send the request with fetch()
        fetch(request)
        .then((res) => {
            //Handle response we get from the API.
            //Usually check the error codes to see what happened.
            if (res.status === 200) {
                //If student was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Deleted an account.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not delete an account.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
      
   }

    generateUserTableRows = () => {
      const usersinfo = this.state.userList;
      const accountsinfo = this.state.accountList;
      let tableRows = [];
      tableRows.push(
       <tr>
          <th> UserId </th>
          <th> UserName </th>
          <th> AddAdmin </th>
          <th> ManageAccount </th>
      </tr>
      );
      {this.displayUsers(usersinfo, accountsinfo)};
      if (!this.state.tableshow) {
        return <table className="user-table"> {tableRows.map(tableRows => tableRows)} </table>;
      }
    }

    generateSearchTableRows = (id) => {
      const { dashboard } = this.props;
      const usersinfo = this.state.userList;
      const accountsinfo = this.state.accountList;
      let tableRows = [];
      tableRows.push(
       <tr>
          <th> UserId </th>
          <th> UserName </th>
          <th> AddAdmin </th>
          <th> ManageAccount </th>
      </tr>
      );
      {this.displayUsers(usersinfo, accountsinfo, id)};
      if (this.state.tableshow) {
        return <table className="search-table"> {tableRows.map(tableRows => tableRows)} </table>;
      }
    }
    

    onClick = () => {
        this.setState({ tableshow: !this.props.tableshow });
    }

    inputChange = (e) => {
      this.setState({
            [this.state.searchid]: e.target.value
      });
    }

    displayUsers = (users, accounts) => {
      const { dashboard } = this.props;
      return users.map((user, account, index) => (
            <tr>
            <td> {index} </td>
            <td> {user.username} </td>
            <td> {<button className='AddAdmin' onClick={() => this.setAdmin(user.isAdmin)}>Set Administrator</button>} </td>
            <td> {<button className='Delete' onClick={() => this.deleteAccount(account.creator, dashboard)}>Delete Account</button>}  </td> 
            </tr>
      ))
    }
    
    displaySearchUsers = (users, accounts, id) => {
      const { dashboard } = this.props;

      return users.map((user, account, index) => (
            <tr>
            <td> {index} </td>
            <td> {user.username} </td>
            <td> {<button className='AddAdmin' onClick={() => this.setAdmin(user.isAdmin)}>Set Administrator</button>} </td>
            <td> {<button className='Delete' onClick={() => this.deleteAccount(account.creator, dashboard)}>Delete Account</button>}  </td> 
            </tr>
          
      ))
    }

    ComponentDidMount = () => {
      this.getUsers();
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