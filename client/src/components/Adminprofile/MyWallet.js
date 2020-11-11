import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import './Profile.css';
import Sidebar from './Content'
import Information from './Information'
import Header from './Header'

class MyWallet extends Component {
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

                </div>
         );
    }
}
 
export default MyWallet;