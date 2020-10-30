import React, { Component } from 'react';
import TradingViewWidget from 'react-tradingview-widget';

class Chart extends Component {
    state = { 
        symbol: 'BTCUSD'
     }
    render() { 
        return (
                <div className='dashboard-main-chart-container'>
                    <TradingViewWidget className='dashboard-main-chart'
                        symbol={this.state.symbol}
                        width = '1000'
                        height = '400'
                    />
                </div>
                 );
    }
}
 
export default Chart;
