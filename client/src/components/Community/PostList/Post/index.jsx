import React, { Component } from 'react';
import PostComment from "./PostComment/index"
import { removePost } from "../actions/stack"


class Post extends Component{

    render() {
        const { post, stackComponent } = this.props;

        return (
            <div>
                <h1>{post.title}</h1>
                <h6>{post.author}</h6>
                <h6>{post.date}</h6>
                <p>{post.content}</p>
                <PostComment />
                <button onClick={()=>removePost(stackComponent, post)}>Delete Post</button>
            </div>
        )
    }
    


}

export default Post;