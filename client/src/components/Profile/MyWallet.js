import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import './Profile.css';
import Sidebar from './Content'
import Information from './Information'
import Header from './Header'

class MyWallet extends Component {
    state = {  }
    render() { 
        return (
           <div className='title'>
                <p> cash: '10,000.00' </p>
        <p> marketValue: '3,000.46' </p>
         <p> equity: '13,000.46'  </p>
         <p> unrealizedPL: '223.32'  </p>
         <p> PLIsProfit: true </p>
         <p>date: '14:00 PST 29 Oct 2020' </p>
        <p> currency: 'CAD' </p>
                </div>
         );
    }
}
 
export default MyWallet;