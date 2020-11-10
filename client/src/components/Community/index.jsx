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
        content: null,
        postDate: "",
        open: false,
        // permission used to tell whether the current user can delete a post
        isAdmin: false,
        //hard-coded data, will be replaced in phase2
        posts: [
            {postID: 0, title: "Bitcoin Intruduction", author: "btc", content: "Bitcoin (BTC) is recognised as the world’s first truly digitalised digital currency (also known as a cryptocurrency). The Bitcoin price is prone to volatile swings; making it historically popular for traders to speculate on. Follow the live Bitcoin price using the real-time chart, and read the latest Bitcoin news and forecasts to plan your trades using fundamental and technical analysis.", 
                date: "20201111", comments:[{username:"Ming", text:"Good"}]},
            {postID: 1, title: "ahh1", author: "sb1", content: "ahhhhhhhhhh1", 
                date: "20201111", comments:[{username:"Zhang", text:"Bad"}]},
            {postID: 2, title: "ahh2", author: "sb2", content: "ahhhhhhhhhh2", 
                date: "20201111", comments:[{username:"Zhao", text:"Perfect"}]},
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

    onValueChange = (content) => {
        console.log(this.state.content);
        this.setState({
           content
        })
    }


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
                    onValueChange={this.onValueChange}
                    // position,
                    handleSubmit={this.handleSubmit}
                /> 
                <PostList posts={this.state.posts} stackComponent={this} 
                    permission={this.state.isAdmin}/>
            </div>
            );
    }
}
 
export default Community;
