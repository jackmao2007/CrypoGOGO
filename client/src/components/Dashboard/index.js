import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import "./styles.css";
import NewsSection from './NewsSection';
import Chart from './Chart';


class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar/>
                <Chart/>
                <NewsSection />
            </div>
         );
    }
}
 
export default Dashboard;