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
            {postID: 0, title: "ahh0", author: "sb0", content: "ahhhhhhhhhh0", date: "20201111"},
            {postID: 1, title: "ahh1", author: "sb1", content: "ahhhhhhhhhh1", date: "20201111"},
            {postID: 2, title: "ahh2", author: "sb2", content: "ahhhhhhhhhh2", date: "20201111"},
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
