import React, { Component } from 'react';
import PostComment from "./PostComment"
import Divider from '@material-ui/core/Divider';
import { removePost } from "../actions/stack"
import Reply from './Reply'

class Post extends Component{

    render() {
        const { post, stackComponent, permission } = this.props;

        return (
            <div>
                <div>
                    <h1> {post.title} </h1>
                </div>
                <h6>{post.author}</h6>
                <h6>{post.date}</h6>
                <Divider/>
                <div dangerouslySetInnerHTML={{__html: post.content}} />
                <Divider />
                <PostComment />
                <Divider/>
                <Reply/>
                {/* use state to tell whether current user has permission to delete a post */}
                {permission && (
                    <button onClick={()=>removePost(stackComponent, post)}>Delete Post</button>
                )}
            </div>
        )
    }
    


}

export default Post;