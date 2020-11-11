import React, { Component } from 'react';

class AccountOrders extends Component {
    state = { 
        orders: [
            {
                symbol: "BTC",
                status: "Accepted", // Accepted, Excecuted, Cancelled
                action: "Buy",
                quantity: 0.42,
                limit: "11123.24",
                stop: "--",
                duration: 'DAY',
                type: 'Limit',
                timePlaced: '07 Nov 2020 11:24:23 PM'
            },
            {
                symbol: "LTC",
                status: "Excecuted", // Accepted, Excecuted, Cancelled
                action: "Sell",
                quantity: 1.42,
                limit: "5223.24",
                stop: "--",
                duration: 'DAY',
                type: 'Limit',
                timePlaced: '07 Nov 2020 11:34:13 PM'
            },
            {
                symbol: "ETH",
                status: "Excecuted", // Accepted, Excecuted, Cancelled
                action: "Sell",
                quantity: 10.0,
                limit: "--",
                stop: "14128.92",
                duration: 'DAY',
                type: 'Stop',
                timePlaced: '05 Nov 2020 11:25:00 PM'
            }
        ]
    }

    componentDidMount() {
        // populate state from this.prop.accountNumber via server request
    }

    componentDidUpdate(prevProps, prevState) {
        // populate state from this.props.accountNumber server request
        // This is different from the dashboard page, this will update with a server request
        if (this.props.accountNumber !== prevProps.accountNumber || this.props.updatedTime !== prevProps.updatedTime) {
            // fetch data 
            console.log("fetch account balances data");
            // setState
          }
    }

    mapOrdersToTableRow = () => {
        return this.state.orders.map((orderObj) => {
            return <tr>
                        <td> {orderObj.symbol} </td>
                        <td> {orderObj.status} </td>
                        <td> {orderObj.action} </td>
                        <td> {orderObj.quantity} </td>
                        <td> {orderObj.limit} </td>
                        <td> {orderObj.stop} </td>
                        <td> {orderObj.duration} </td>
                        <td> {orderObj.type} </td>
                        <td> {orderObj.timePlaced} </td>
                </tr>
        });
    }

    render() { 
        return ( 
            <div className="trading-account-orders-container">
                <h3> Orders </h3>
                <table className="trading-account-order-balance-table">
                    <tr>
                        <th> Symbol </th>
                        <th> Status </th>
                        <th> Action </th>
                        <th> Qty </th>
                        <th> Limit </th>
                        <th> Stop </th>
                        <th> Duration </th>
                        <th> Type </th>
                        <th> Time Placed </th>
                    </tr>
                    {this.mapOrdersToTableRow()}
                </table>                
            </div>
         );
    }
}
 
export default AccountOrders;