import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import SearchBox from "./SearchBox/index"
import PostList from"./PostList/index"
import NewPostButton from "./NewPostButton/index"
import {addPost} from "./PostList/actions/stack"

class Community extends Component {
    state = {
        postTitle: "",
        postAuthor: "",
        postContent: "",
        postDate: "",
        posts: [
            {title: "ahh1", author: "sb1", content: "ahhhhhhhhhh1", date: "20201111"},
            {title: "ahh2", author: "sb2", content: "ahhhhhhhhhh2", date: "20201111"},
            {title: "ahh3", author: "sb3", content: "ahhhhhhhhhh3", date: "20201111"},
        ]
     }

    render() { 
        return (
            <div>
                <Navbar /> 
                <SearchBox />
                <NewPostButton addPost={() => addPost(this)}/>
                <PostList posts={this.state.posts} stackComponent={this}/>
            </div>
            );
    }
}
 
export default Community;
