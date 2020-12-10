import React, { Component } from 'react';

class AccountBalance extends Component {
    state = { 
        balance:{
            cash: 10000.00,
            marketValue: 20000.23,
            totalEquity: 30000.23,
            maintenanceExcess: 10000.00,
            buyingPower: 10000.00
        },
        positions:[
            {
                symbol: "BTC",
                avgPrice: 11232.23,
                quantity: 1.232,
                marketValue: 13838.11,
                price: 12100.00,
                openPL: 1231.00,
            },
            {
                symbol: "LTC",
                avgPrice: 22232.23,
                quantity: 3.132,
                marketValue: 63838.11,
                price: 12100.00,
                openPL: -31231.00,
            },
            {
                symbol: "BTC",
                avgPrice: 11232.23,
                quantity: 1.232,
                marketValue: 13838.11,
                price: 12100.00,
                openPL: 1231.00,
            },
            {
                symbol: "BTC",
                avgPrice: 11232.23,
                quantity: 1.232,
                marketValue: 13838.11,
                price: 12100.00,
                openPL: 1231.00,
            },
            {
                symbol: "BTC",
                avgPrice: 11232.23,
                quantity: 1.232,
                marketValue: 13838.11,
                price: 12100.00,
                openPL: 1231.00,
            },
            {
                symbol: "BTC",
                avgPrice: 11232.23,
                quantity: 1.232,
                marketValue: 13838.11,
                price: 12100.00,
                openPL: 1231.00,
            },
        ]
     }


    componentDidMount() {
        // populate state from this.props.accountNumber request
    }

    componentDidUpdate(prevProps, prevState) {
        // populate state from this.props.accountNumber server request
        // This is different from the dashboard page, this will update with a server request
        if (this.props.accountNumber !== prevProps.accountNumber || this.props.updatedTime !== prevProps.updatedTime) {
            // fetch data 
          }
        // setState
    }

    mapPositionsToTableRows= () => {
        return this.state.positions.map((position) => {
            let plClass = "pos-PL-val";
            if (position.openPL < 0){
                plClass = "neg-PL-val"
            }
            return <tr>
                        <td> {position.symbol} </td>
                        <td> {position.quantity} </td>
                        <td> {position.avgPrice} </td>
                        <td> {position.price} </td>
                        <td> {position.marketValue} </td>
                        <td> <span className={plClass}> {position.openPL} </span> </td>
                    </tr>
        });
    }

    render() { 
        return (
            <div className='trading-account-balance'>
                <div className="trading-current-balance-container">
                    <h3> Current Balances </h3>
                    <table className="trading-account-balance-table-current">
                        <tr>
                            <td> <span className="balance-label"> Cash: </span>  </td>
                            <td> {this.state.balance.cash} </td>
                        </tr>
                        <tr>
                            <td> <span className="balance-label"> MarketValue: </span> </td>
                            <td> {this.state.balance.marketValue} </td>
                        </tr>
                        <tr>
                            <td> <span className="balance-label"> Total Equity: </span> </td>
                            <td> {this.state.balance.totalEquity} </td>
                        </tr>
                        <tr>
                            <td> <span className="balance-label"> Maintenance Excess: </span> </td>
                            <td> {this.state.balance.maintenanceExcess} </td>
                        </tr>
                        <tr>
                            <td> <span className="balance-label"> Buying Power: </span> </td>
                            <td> {this.state.balance.buyingPower} </td>
                        </tr>
                    </table>
                </div>
                <div className="trading-positions-container">
                    <h3> Positions </h3>
                    <table className="trading-account-balance-table">
                        <tr>
                            <th> Symbol</th>
                            <th> Quantit </th>
                            <th> Avg pric </th>
                            <th> Price</th>
                            <th> Market valu </th>
                            <th>Open P&L</th>
                        </tr>
                        {this.mapPositionsToTableRows()}
                    </table>
                </div>

            </div>
          );
    }
}
 
export default AccountBalance;