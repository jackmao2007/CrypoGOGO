import React, { Component } from 'react';
import TradingViewWidget from 'react-tradingview-widget';

import './styles.css'

class Sidebar extends Component {
    state = {
      assets: [
        {
          symbol: "BTC",
          price: "1134.23",
          name: "Bitcoin/USD",
          dayChange: "+123"

        },
        {
          symbol: "ETH",
          price: "534.23",
          name: "Etherum/USD",
          dayChange: "+123"

        },
        {
          symbol: "LTC",
          price: "58.23",
          name: "Litecoin/USD",
          dayChange: "+123"

        },
      ],
      selectedAsset: "BTC"

    }

    updateSelectedAsset = (symbol) => {
      this.setState({selectedAsset: symbol});
    }

    generateSideBarLi = () => {
      return this.state.assets.map((assets) => {
        return <li className='trading-side-bar-asset' onClick={()=> {this.updateSelectedAsset(assets.symbol)}}>
              <span className='header'> {assets.symbol} </span> <span className='subheader'> {assets.price} </span>
              <h6> <span style={{color:"grey"}}> {assets.name}</span> <span style={{color:"green"}}> {this.dayChange} </span> </h6>
        </li>
      })
    }

    render() { 
        return ( 
      <div style={{ display: "block", float: "left" }}>
        <div className="sidebar">
          <input type="text" id="mySearch" placeholder="Search.." title="Type in a Bitcoin"/>
          <ul>
            {this.generateSideBarLi()}
          </ul>
        </div>
        <div className="trading-current-asset-container">
          <TradingViewWidget symbol={this.state.selectedAsset} width="850" height="400"/>
        </div>
      </div>
  );    
    }
}
 
 export default Sidebar;
