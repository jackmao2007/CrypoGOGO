import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import Chart from "./Chart"
import Account from "./Account"
import Info from "./Info"
import MakeOrder from "./MakeOrder"
import Positions from "./Positions"
import CurrOrder from "./CurrOrder"

class BTC extends Component {
    state = {  }
    render() { 
        return ( 
                <div>
                	<Chart/>
                	<Account/>
                	<Positions/>
                	<CurrOrder/>
                	<Info/>
                	<MakeOrder/>
                </div>
                );
    }
}
 
export default BTC;