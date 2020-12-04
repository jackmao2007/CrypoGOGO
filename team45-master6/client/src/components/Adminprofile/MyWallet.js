import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import './Profile.css';
import Sidebar from './Content'
import Information from './Information'
import Header from './Header'
import { Tag } from 'antd';

class MyWallet extends Component {
    state = {
      accountList: [
        { 
          accountNumber: 10000000,
          cash: 2000,
          marketValue: 123123,
          PnL: 23123
        },
        { 
          accountNumber: 10000001,
          cash: 2000,
          marketValue: 223123,
          PnL: 123123
        },
        { 
          accountNumber: 10000002,
          cash: 2000,
          marketValue: 23123,
          PnL: (77887)
        }
      ]
    }

    getAccountInfo() {
      // fetch account info
    }

    componentDidMount() {
      this.getAccountInfo();
    }

    handleAddAccount(){
      // server call
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
                <th>Market Value</th>
                <th>P&L</th>
              </tr>
              {this.state.accountList.map((account) => { return (
                  <tr>
                    <td>{account.accountNumber}</td>
                    <td>{account.cash}</td>
                    <td>{account.marketValue}</td>
                    <td>{account.PnL}</td>
                    <td><button className="profile-delete-account-btn" onClick={() => this.handleDeleteAccount(account)}> delete </button></td>
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