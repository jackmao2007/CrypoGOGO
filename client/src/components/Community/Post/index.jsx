import React, { Component } from 'react';
import PostComment from "../PostComment/index"


class Post extends Component{

    render() {
        return (
            <div>
                <h1>{ this.props.title }</h1>
                <h6>Author: XXX Date: 2020-10-20</h6>
                <p> { this.props.content } </p>
                <PostComment />
            </div>
        )
    }
    


}

export default Post;