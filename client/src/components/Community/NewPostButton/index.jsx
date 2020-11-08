import React, { Component } from 'react';



class NewPostButton extends Component{
  render() {
    const {addPost} = this.props;

    return (
      <button onClick={addPost}>NEW POST</button>
    )
  }



}

export default NewPostButton;
