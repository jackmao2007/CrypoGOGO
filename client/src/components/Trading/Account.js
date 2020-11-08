import React, { Component } from 'react';

class Account extends Component {
    state = {  }
    render() { 
        return (
            <a href={this.props.url} target="_blank">
                <div className='account-container'>
                     <p> Username: jjjjj456@gmail.com</p>
                     <p> cash: '10,000.00'</p>
                     <p> equity: '13,000.46' </p>
                </div>
            </a>
         );
    }
}
 
export default Account;