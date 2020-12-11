import React, { Component } from 'react';
import SearchBox from "./SearchBox"
import PostList from "./PostList/index"
import { getPosts, searchPost } from "./actions/stack"
import NewPostForm from './NewPost';


class Community extends Component {
    state = {
        // permission used to tell whether the current user can delete a post
        isAdmin: true,
        searched: false,
        filteredPost: [],
        postList: []
    };


    handleInput = (event) => {
        const kw = event.target.value.toLowerCase().trim();
        if (kw === "") {
            this.setState({ searched: false }, ()=>{
                console.log(this.state.searched)
            })
        } else {
            this.setState({ searched: true })
        }
        if (this.state.searched) {
            this.setState({ filteredPost: searchPost(kw, this.state.postList) })
        }
    }


    async componentDidMount() {
        await getPosts(this);
    }

    async componentDidUpdate() {
        await getPosts(this);
    }


    render() {
        return (
            <div>
                <NewPostForm community={this} />
                <SearchBox handleInput={this.handleInput} />
                {!this.state.searched && (<PostList posts={this.state.postList}
                    permission={this.state.isAdmin} />)}
                {this.state.searched && (<PostList posts={this.state.filteredPost}
                    permission={this.state.isAdmin} />)}
            </div>
        );
    }
}

export default Community;
