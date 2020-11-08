import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import AccountBalance from './AccountBalance';
import AccountOrders from './AccountOrders';
import "./styles.css";
import Sidebar from "./Sidebar"

class Trading extends Component {
    state = { 
        accounts: ["10000000", "10000001", "10000003"],
        currentAccount: "10000000"
    }

    accountSelector = React.createRef();

    componentDidMount() {
        // populate state
        // get account ids
    }



    handleAccountSelectChange = () => {
        this.setState({currentAccountNumber: this.accountSelector.current.value});
    }

    render() { 
        return ( 
                <div>
                    <Navbar/>
                    <Sidebar/>
                    <div className="trading-asset-info-section-container">
                        
                    </div>
                    <div className="trading-account-info-section-container">
                        <div>
                            <span id="trading-account-info-section-header"> My Account </span>
                            <div className="trading-account-list-container">
                                Select Account: 
                                <select ref={this.accountSelector} id="trading-account-list" onChange={this.handleAccountSelectChange}>
                                {this.state.accounts.map((accountNumber)=> <option value={accountNumber}> {accountNumber} </option>)}
                                </select>
                            </div>
                        </div>
                        <AccountBalance accountNumber={this.state.currentAccount}/>
                        <AccountOrders accountNumber={this.state.currentAccount}/>
                    </div>
                </div>
                );
    }
}
 
export default Trading;