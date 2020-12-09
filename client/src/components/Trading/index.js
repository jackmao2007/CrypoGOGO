import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import AccountBalance from './AccountBalance';
import AccountOrders from './AccountOrders';
import "./styles.css";
import Sidebar from "./Sidebar"

class Trading extends Component {
    state = { 
        accounts: ["10000000", "10000001", "10000003"],
        currentAccount: "10000000",
        updatedTimestamp: "100000"
    }

    accountSelector = React.createRef();

    componentDidMount() {
        // populate state
        // get account ids
    }

    updateAccount = () => {
        this.setState({updatedTimestamp: Date.now()});
        // do server calls too accounts
    }



    handleAccountSelectChange = () => {
        this.setState({currentAccountNumber: this.accountSelector.current.value});
    }

    render() { 
        return ( 
                <div>
                    <Sidebar accountNumber={this.state.currentAccount} onOrder={this.updateAccount} />
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
                        <AccountBalance accountNumber={this.state.currentAccount} updatedTime={this.state.updatedTimestamp}/>
                        <AccountOrders accountNumber={this.state.currentAccount} updatedTime={this.state.updatedTimestamp}/>
                    </div>
                </div>
                );
    }
}
 
export default Trading;