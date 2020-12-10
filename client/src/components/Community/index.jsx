import React, { Component } from 'react';
import SearchBox from "./SearchBox"
import PostList from"./PostList/index"
import { getPosts, searchPost } from "./actions/stack"
import NewPostForm from './NewPost';


class Community extends Component {
        state = {
            // permission used to tell whether the current user can delete a post
            isAdmin: true,
            searchKeyWord: "",
            searched: false,
            filteredPost: [],
            postList: []
        };


    handleSearchInput = event => {
        const kw = event.target.value.toLowerCase();
        this.setState({searchKeyWord: kw});
        if(kw.trim() === ""){
            this.setState({searched: false})
        }else{
            this.setState({searched: true})
        }
        if(this.state.searched){
            this.setState({ filteredPost: searchPost(this) })
        }
    };


    componentDidMount() {
        getPosts(this);
    }

    componentDidUpdate() {
        getPosts(this);
    }


    render() { 
        return (
            <div>
                <NewPostForm community={ this }/> 
                <SearchBox handleSearchInput={this.handleSearchInput}/>
                {!this.state.searched && (<PostList posts={this.state.postList} 
                    permission={this.state.isAdmin}/>)}
                {this.state.searched && (<PostList posts={this.state.filteredPost} 
                    permission={this.state.isAdmin}/>)}
            </div>
            );
    }
}
 
export default Community;
