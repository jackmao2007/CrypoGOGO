import React, { Component } from 'react';
import './Profile.css';

class List extends Component {
    state = { 
      userid: "", username:"",
      users: [
      {userid: '1', username: 'AA'},
      {userid: '2', username: 'BB'},
       {userid: '3', username: 'CC'}]
    }
    handleInputChange = (event) => {
      const target = event.target
      const value = target.value
      const name = target.name

      this.setState({
        [name]: value
      })
    }

    render() { 
        return (
<div className='list'>
  <h1> User Lists</h1>
  <input id="UserId"
         value= {this.state.userid}
         OnChange={this.handleInputChange}
         type="text"
         name="UserId"
         placeholder="UserId" />
  <input id="UserName"
         value= {this.state.username}
         OnChange={this.handleInputChange}
         type="text"
         name="UserName"
         placeholder="UserName" />
  <input onClick={this.sumbit} type="submit" value="Search User" />  

    <table className='user' >
      {this.state.userid} - {this.state.username} <button class='AddAdmin'>Add Administrator</button> <button class='Delete'>Delete User</button> 
    </table>
      
   </div>
         );
    }
}
 
export default List;