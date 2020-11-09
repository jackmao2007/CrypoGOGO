import React, { Component } from 'react';
import PostComment from "./PostComment"
import Divider from '@material-ui/core/Divider';
import { removePost } from "../actions/stack"
import Reply from './Reply'

class Post extends Component{

    render() {
        const { post, stackComponent } = this.props;

        return (
            <div>
                <h1>{post.title}</h1>   
                <h6>{post.author}</h6>
                <h6>{post.date}</h6>
                <Divider/>
                <p>{post.content}</p>
                <Divider variant="middle" />
                <PostComment />
                <Divider/>
                <Reply/>
                <button onClick={()=>removePost(stackComponent, post)}>Delete Post</button>
            </div>
        )
    }
    


}

export default Post;