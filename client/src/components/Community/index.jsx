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
        posts: [
            {postID: 0, title: "Bitcoin Intruduction", author: "btc", content: "Bitcoin (BTC) is recognised as the world’s first truly digitalised digital currency (also known as a cryptocurrency). The Bitcoin price is prone to volatile swings; making it historically popular for traders to speculate on. Follow the live Bitcoin price using the real-time chart, and read the latest Bitcoin news and forecasts to plan your trades using fundamental and technical analysis.", 
                date: "20201100", comments:[{username:"Ming", text:"Good Post!", time:"19:23, Oct 28, 2020"}, {username:"George", text:"That's not bad!", time:"20:23, Nov 2, 2020"}]},
            {postID: 1, title: "WHAT IS ETHEREUM?", author: "eth", content: "In the Ethereum universe, there is a single, canonical computer (called the Ethereum Virtual Machine, or EVM) whose state everyone on the Ethereum network agrees on. Everyone who participates in the Ethereum network (every Ethereum node) keeps a copy of the state of this computer. Additionally, any participant can broadcast a request for this computer to perform arbitrary computation. Whenever such a request is broadcast, other participants on the network verify, validate, and carry out (“execute”) the computation. This causes a state change in the EVM, which is committed and propagated throughout the entire network.", 
                date: "20201104", comments:[{username:"Zhang", text:"Bad", time:"19:23, Oct 28, 2020"}]},
            {postID: 2, title: "Litecoin", author: "wiki", content: "Litecoin (LTC or Ł) is a peer-to-peer cryptocurrency and open-source software project released under the MIT/X11 license. Creation and transfer of coins is based on an open source cryptographic protocol and is not managed by any central authority.[citation needed] Litecoin was an early bitcoin spinoff or altcoin, starting in October 2011.[2] In technical details, litecoin is nearly identical to Bitcoin.", 
                date: "20201111", comments:[{username:"Zhao", text:"Perfect", time:"19:23, Oct 28, 2020"}]},
        ]

    };

    handleSearchInput = event => {
        const kw = event.target.value.toLowerCase();
        this.setState({searchKeyWord: kw});
        const filteredPosts = searchByKeyWord(this, kw);
        this.setState({filteredPost: filteredPosts})
        this.setState({searched: true})
        console.log(this.state.posts)
    };



    render() { 
        return (
            <div>
                <NewPostForm community={ this }/> 
                <SearchBox keyword={this.state.searchKeyWord} stackComponent={this}
                handleSearchInput={this.handleSearchInput}/>
                {!this.state.searched && (<PostList posts={this.state.posts} 
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
