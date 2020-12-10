import React, { Component } from 'react';
import SearchBox from "./SearchBox"
import PostList from"./PostList/index"
import { searchByKeyWord } from "./actions/stack"
import NewPostForm from './NewPost';


class Community extends Component {
        state = {
            // permission used to tell whether the current user can delete a post
            isAdmin: true,
            searchKeyWord: "",
            searched: false,
            filteredPost: [],
            //hard-coded data, will be replaced by real server call in phase2
            postList: []
        };


    handleSearchInput = event => {
        const kw = event.target.value.toLowerCase();
        this.setState({searchKeyWord: kw});
        const filteredPosts = searchByKeyWord(this, kw);
        this.setState({filteredPost: filteredPosts})
        this.setState({searched: true})
        console.log(this.state.posts)
    };

    async componentDidMount() {
        const url = `/api/posts`;

        const resp = await fetch(url);
        const posts = await resp.json()
        this.setState({ postList: posts })
    }

    async componentDidUpdate() {
        const url = `/api/posts`;

        const resp = await fetch(url);
        const posts = await resp.json()
        this.setState({ postList: posts })
    }


    render() { 
        return (
            <div>
                <NewPostForm community={ this }/> 
                <SearchBox keyword={this.state.searchKeyWord} stackComponent={this}
                handleSearchInput={this.handleSearchInput}/>
                {!this.state.searched && (<PostList posts={this.state.postList} 
                    stackComponent={this} 
                    permission={this.state.isAdmin}/>)}
                {this.state.searched && (<PostList posts={this.state.filteredPost} 
                    stackComponent={this} 
                    permission={this.state.isAdmin}/>)}
            </div>
            );
    }
}
 
export default Community;
