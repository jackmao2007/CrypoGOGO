import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import './Profile.css';
import Sidebar from './Content'
import Information from './Information'
import Header from './Header'

class MyWallet extends Component {
    render() { 
        return (
            <div className='title'>
            <tr>
          <th> Cash </th>
          <th> Profit </th>
          <th> Loss </th>
          <th> Currency </th>
          <th> Currency Amount</th>
        </tr>
        <tr>
            <td> 10000.00 </td>
            <td> 3000.00</td>
            <td> 200.00 </td>
            <td> CAD </td>
            <td> 200.00 </td>
          </tr>

                </div>
         );
    }
}
 
export default MyWallet;