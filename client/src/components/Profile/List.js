import React, { Component } from 'react';
import './Profile.css';

class List extends Component {
    state = {    
    }
    render() { 
        return (
                let users = [
                   {id: 1, Username: "AA"},
                   {id: 2, Username: "BB"},
                   {id: 3, Username: "CC"}]
                let el to document.getElementByID('')
                for ( let user of users) {
                    el.innerHTML += `<div><span>${user.Username}</span></div>`
                }
  }
}
                }
         );
    }
}
 
export default List;