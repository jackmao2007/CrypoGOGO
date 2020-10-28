import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import SearchBox from "./SearchBox/index"
import PostList from"./PostList/index"


class Community extends Component {
    state = {  }

    render() { 
        return (
            <div>
                <Navbar /> 
                <SearchBox />
                <PostList />
            </div>
            );
    }
}
 
export default Community;
