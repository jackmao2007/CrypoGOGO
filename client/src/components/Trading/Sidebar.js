import React, { Component } from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import { thatReturnsArgument } from 'react-tradingview-widget/dist/vendor';

import './styles.css'

class Sidebar extends Component {
    state = {
      orderConfig: {
        isLimit: false,
        isStop: false,
        isBracket: false
      },
      assets: [
        {
          symbol: "BTC",
          price: "1134.23",
          name: "Bitcoin/USD",
          dayChange: "+123",
          open: 123123,
          high: 123123,
          low: 123123,
          vol: 123123,
          w52high: 123123,
          w52low: 123123,
          prevClose: 100000,
          marketCap: "123.3B"
        },
        {
          symbol: "ETH",
          price: "534.23",
          name: "Etherum/USD",
          dayChange: "+123",
          open: 223123,
          high: 223123,
          low: 223123,
          vol: 223123,
          w52high: 223123,
          w52low: 223123,
          prevClose: 200000,
          marketCap: "23.3B"

        },
        {
          symbol: "LTC",
          price: "58.23",
          name: "Litecoin/USD",
          dayChange: "+123",
          open: 323123,
          high: 323123,
          low: 323123,
          vol: 323123,
          w52high: 323123,
          w52low: 323123,
          prevClose: 300000,
          marketCap: "13.3B"

        },
      ],
      selectedAsset: "BTC"
    }
    orderQuantityRef = React.createRef();
    orderTypeRef = React.createRef();
    orderLimitRef = React.createRef();
    orderStopRef = React.createRef();
    orderDurationRef = React.createRef();
    orderBracketRef = React.createRef();
    orderProfitRef = React.createRef();
    orderProfitQtyRef = React.createRef();
    orderProfitLmtRef = React.createRef();
    orderProfitDurRef = React.createRef();
    orderLossQtyRef = React.createRef();
    orderLossStpRef = React.createRef();
    orderLossDurRef = React.createRef();

    updateSelectedAsset(symbol) {
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

    updateSelectedOrderType(type) {
      if (type == "market") {
        this.setState({orderConfig: { isLimit: false, isStop: false,
          isBracket: this.state.orderConfig.isBracket}});
      } else if (type == "limit") {
        this.setState({orderConfig: { isLimit: true, isStop: false,
          isBracket: this.state.orderConfig.isBracket}});
      } else {
        this.setState({orderConfig: { isLimit: false, isStop: true,
          isBracket: this.state.orderConfig.isBracket}});
      }
    }

    updateBracketOrderSelect = () => {
    
      if (this.orderBracketRef.current.checked) {
        this.setState({orderConfig : { isLimit: this.state.orderConfig.isLimit,
          isStop: this.state.orderConfig.isStop,
          isBracket: true}});
      } else {
        this.setState({orderConfig : { isLimit: this.state.orderConfig.isLimit,
          isStop: this.state.orderConfig.isStop,
          isBracket: false}});
      }
    }

    generateOrderLimitStopFields = () => {
      let generate = [];
      if (this.state.orderConfig.isLimit) {
        generate.push(<div className="order-input-field"> Limit: <input ref={this.orderLimitRef} /> </div>);
      }
      if (this.state.orderConfig.isStop) {
        generate.push(<div className="order-input-field"> Stop: <input ref={this.orderStopRef} /> </div>);
      }
      return generate;
    }

    generateBracketOrderFields = () => {
      if (this.state.orderConfig.isBracket) {
        return <div className="order-bracket-section">
          <div className="order-input-field"> Profit:  
            <div className="order-input-field"> - Qty: <input ref={this.orderProfitQtyRef}/></div>
            <div className="order-input-field"> - Lmt: <input ref={this.orderProfitLmtRef}/> </div>
            <div className="order-input-field"> - Dur: <select ref={this.orderProfitDurRef}> <option value="DAY"> DAY </option> <option value="GTC"> GTC </option></select> </div>
          </div>
          <div className="order-input-field"> Loss: 
            <div className="order-input-field"> - Qty: <input ref={this.orderLossQtyRef}/></div>
            <div className="order-input-field"> - Stp: <input ref={this.orderLossStpRef}/> </div>
            <div className="order-input-field"> - Dur: <select ref={this.orderLossDurRef}> <option value="DAY"> DAY </option> <option value="GTC"> GTC </option></select> </div></div>
        </div>
      }
    }

    findAssetInfo(symbol) {
      return this.state.assets.filter((asset) => asset.symbol == symbol)[0]
    }

    sendOrder(BuySell) {
      this.props.onOrder();
      // Send server request with information thats is in the input fields
      // grab information from react refs
    }

    render() { 
        return ( 
      <div style={{ display: "block", float: "left", width: "1100px" }}>
        <div className="sidebar">
          <input type="text" id="mySearch" placeholder="Search.." title="Type in a Bitcoin"/>
          <ul>
            {this.generateSideBarLi()}
          </ul>
        </div>
        <div className="sidebar-margin">
        </div>
        <div className="trading-current-asset-container">
          <TradingViewWidget symbol={this.state.selectedAsset} width="850" height="400"/>
        </div>
        <ul className="trading-current-asset-info-conatiner">
          <li className="trading-current-asset-info-field"> Open: {this.findAssetInfo(this.state.selectedAsset).open} </li>
          <li className="trading-current-asset-info-field"> Prev. Close: {this.findAssetInfo(this.state.selectedAsset).prevClose} </li>
          <li className="trading-current-asset-info-field"> High: {this.findAssetInfo(this.state.selectedAsset).high} </li>
          <li className="trading-current-asset-info-field"> Low: {this.findAssetInfo(this.state.selectedAsset).low} </li>
          <li className="trading-current-asset-info-field"> Volume: {this.findAssetInfo(this.state.selectedAsset).vol} </li>
          <li className="trading-current-asset-info-field"> 52 Week High: {this.findAssetInfo(this.state.selectedAsset).w52high} </li>
          <li className="trading-current-asset-info-field"> 52 Week Low: {this.findAssetInfo(this.state.selectedAsset).w52low} </li>
          <li className="trading-current-asset-info-field"> Market Cap.: {this.findAssetInfo(this.state.selectedAsset).marketCap} </li>
        </ul>
        <div className="trading-order-container">
          <h4> Make Order </h4>
          <div className="order-input-field"> Quantity: <input ref={this.orderQuantityRef} /> </div>
          <div className="order-input-field">
          Order Type: <select ref={this.orderTypeRef} onChange={() => this.updateSelectedOrderType(this.orderTypeRef.current.value)}>
                        <option value="market"> Market </option>
                        <option value="limit"> Limit </option>
                        <option value="stop"> Stop </option>
                        <option value="stopLimit"> Stp Lmt</option>
                      </select>
          </div>
          {this.generateOrderLimitStopFields()}
          <div className="order-input-field"> Duration: <select ref={this.orderDurationRef} >
                        <option value="DAY"> DAY </option>
                        <option value="GTC"> GTC </option>
                      </select>
          </div>
          <div className="order-bracket-select"> Bracket: <input ref={this.orderBracketRef} type="checkbox" onChange={this.updateBracketOrderSelect}/> </div>
          {this.generateBracketOrderFields()}
          <div>
            <button className="order-button-buy" onClick={() => this.sendOrder("buy")}> Buy </button>
            <button className="order-button-sell" onClick = {() => this.sendOrder("sell")}> Sell </button>
          </div>
        </div>
      </div>
  );    
    }
}
 
 export default Sidebar;
