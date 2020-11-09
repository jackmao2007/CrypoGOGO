import React, { Component } from 'react';
import TradingViewWidget from 'react-tradingview-widget';

class Chart extends Component {
    state = { 
        symbol: 'BTCUSD'
     }
    render() { 
        return (
                <div className='chart-container'>
                    <TradingViewWidget className='chart'
                        symbol={this.state.symbol}
                        width = '500'
                    />
                </div>
                 );
    }
}
 
export default Chart;
