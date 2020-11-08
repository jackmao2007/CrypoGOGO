import { TableBody } from '@material-ui/core';
import React, { Component } from 'react';
import Post from "./Post/index";


class PostList extends Component {
  render() {
    const {posts, stackComponent} = this.props;

    return(
      <div>
        <ul>
          {posts.map((post)=>
            <Post post={post} stackComponent={stackComponent}></Post>
          )}
        </ul>
      </div>
    )
  }

}

export default PostList;
