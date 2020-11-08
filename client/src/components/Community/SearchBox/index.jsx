import React, { Component } from 'react';
import "./styles.css"
// just template, will be implemented using MaterialUI


class SearchBox extends Component {
    render() {
        return (
            <div className="searchBox">
                Search Post Template
                { this.props.text }
            </div>
        )
    }

}


export default SearchBox;