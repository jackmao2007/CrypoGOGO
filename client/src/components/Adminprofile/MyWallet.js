import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import './Profile.css';
import Sidebar from './Content'
import Information from './Information'
import Header from './Header'
import { Tag } from 'antd';

class MyWallet extends Component {
    state = {
      accountList: []
        // { 
        //   accountNumber: 10000000,
        //   cash: 2000,
        //   marketValue: 123123,
        //   PnL: 23123
        // },
        // { 
        //   accountNumber: 10000001,
        //   cash: 2000,
        //   marketValue: 223123,
        //   PnL: 123123
        // },
        // { 
        //   accountNumber: 10000002,
        //   cash: 2000,
        //   marketValue: 23123,
        //   PnL: (77887)
        // }

    }

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

    componentDidMount() {
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
    handleDeleteAccount(account) {
      console.log(account.accountNumber)
      // server call
    }

    renderAccountSection = () => {
      return (
        <div className="profile-account-section">
        <div>
          <span className="profile-account-summary-header"> Accounts </span> 
          <button className="profile-add-account-btn"> Add Account</button> 
        </div>
        <table>
          <tbody>
              <tr>
                <th> Account Number </th>
                <th>Cash</th>
              </tr>
              {this.state.accountList.map((account, index) => { return (
                  <tr>
                    <td>{index}</td>
                    <td>{account.cash}</td>
                    <td><button className="profile-delete-account-btn" onClick={() => this.deteleAccount(account.creator, this.props)}> delete </button></td>
                  </tr>
              )
              })}
          </tbody>
        </table>
        </div>
      )
    }

    render() {
      return (
        <div className="wallet">
        <h2> Summary</h2>
          <table className="wallet-table">
          <tr>
        <th> Cash </th>
        <th> Profit </th>
        <th> Loss </th>
        <th> Currency </th>
        <th> Currency Amount</th>
      </tr>
      <tr>
          <td> 10000.00 </td>
          <td> 300000.00</td>
          <td> 20050.00 </td>
          <td> CAD </td>
          <td> 200.00 </td>
        </tr>

              </table>
              <p> Total Cost Last Week : 3000</p>
              <p> Total profit Last Week : 3000</p>
              <h5> Bitconins </h5>
              <table className="bitcoins-table">
          <tr>
        <th> Type </th>
        <th> Amount </th>
      </tr>
      <tr>
          <td> ETC </td>
          <td> 200 </td>
          </tr>
          <tr>
          <td> BTC </td>
          <td> 300 </td>
        </tr>
        </table>
        {this.renderAccountSection()}
      </div>
      );
  }
}
 
export default MyWallet;