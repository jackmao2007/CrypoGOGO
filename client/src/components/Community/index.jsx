import React, { Component } from 'react';
import SearchBox from "./SearchBox"
import PostList from "./PostList/index"
import { getPosts, searchPost } from "./actions/stack"
import NewPostForm from './NewPost';


class Community extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/community");
    }

    state = {
        searched: false,
        filteredPost: [],
        postList: []
    };



    handleInput = (event) => {
        const kw = event.target.value.toLowerCase().trim();
        if (kw === "") {
            this.setState({ searched: false })
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
        const { app } = this.props

        return (
            <div>
                <NewPostForm community={ this }/> 
                <SearchBox handleInput={this.handleInput} />
                {!this.state.searched && (<PostList posts={this.state.postList} 
                    permission={app.state.isAdmin}/>)}
                {this.state.searched && (<PostList posts={this.state.filteredPost} 
                    permission={app.state.isAdmin}/>)}
            </div>
        );
    }
}

export default Community;
