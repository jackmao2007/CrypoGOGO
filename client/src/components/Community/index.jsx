import React, { Component } from 'react';
import Navbar from "../Navbar/index";
import SearchBox from "./SearchBox/index"
import PostList from"./PostList/index"
import {addPost} from "./PostList/actions/stack"
import CreateTopicForm from './CreateTopicForm';

class Community extends Component {
    state = {
        topic: "",
        postAuthor: "",
        content: "",
        postDate: "",
        open: false,
        //hard-coded data, will be replaced in phase2
        posts: [
            {postID: 0, title: "ahh0", author: "sb0", content: "ahhhhhhhhhh0", date: "date: 20201111", comments:[{username:"Ming", text:"Good"}]},
            {postID: 1, title: "ahh1", author: "sb1", content: "ahhhhhhhhhh1", date: "date: 20201111", comments:[{username:"Zhang", text:"Bad"}]},
            {postID: 2, title: "ahh2", author: "sb2", content: "ahhhhhhhhhh2", date: "date: 20201111", comments:[{username:"Zhao", text:"Perfect"}]},
        ]
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };
    
    handleClose = () => {
        this.setState({open: false})
    };

    handleSubmit = () => {
        if (this.state.topic !== "" && this.state.content !== "") {
            addPost(this)
            this.setState({
                topic:"",
                content:""
            })
        } else {
            alert('You cannot create a blank post!')
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value 
        });
    };


    render() { 
        return (
            <div>
                <Navbar /> 
                <SearchBox />
                <CreateTopicForm
                    open={this.state.open}
                    topic={this.state.topic}
                    content={this.state.content}
                    handleChange={this.handleInputChange}
                    handleClose={this.handleClose}
                    handleClickOpen={this.handleClickOpen}
                    // position,
                    handleSubmit={this.handleSubmit}
                /> 
                <PostList posts={this.state.posts} stackComponent={this}/>
            </div>
            );
    }
}
 
export default Community;
