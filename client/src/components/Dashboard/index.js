import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import "./styles.css";
import NewsSection from './NewsSection';
import Chart from './Chart';
import Summary from './Summary';
import Activities from './Activities';

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar/>
                <Chart/>
                <NewsSection />
                <Summary/>
                <Activities/>
            </div>
         );
    }
}
 
export default Dashboard;