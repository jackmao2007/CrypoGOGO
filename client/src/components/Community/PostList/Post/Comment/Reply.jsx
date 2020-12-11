import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";




class Reply extends Component {
    state = { commentContent: ""};

    async handleClick(postID) {
        const url = '/api/posts/comments/' + postID;
        const comment = this.state
        const request = new Request(url, {
            method: "post",
            body: JSON.stringify(comment),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
    
        await fetch(request)
            .then((res) => {
                if (res.status === 200) {
                    console.log("post added")
                } else {
                    console.log(res.status)
                    return;
                }
            }).catch(error => {
                console.log(error)
                return;
            });
    }

    handleInput = (event) => {
        this.setState({
            commentContent: event.target.value,
        })
        console.log(this.state)
    }

    render() {
        const { postID } = this.props
        return (
            <div>
                <TextField id="filled-secondary"
                    label="Reply"
                    variant="filled"
                    onChange={this.handleInput} />
                <Button variant="contained" color="primary" 
                   onClick={() => this.handleClick(postID)}> Reply</Button>
            </div>
        )
    }

}


export default Reply;