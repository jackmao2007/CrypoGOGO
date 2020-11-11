import React, { Component } from 'react';
import PostComment from "./PostComment"
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button"
import { removePost } from "../actions/stack"
import CommentList from './CommentList'
import Reply from './Reply'
import { Card, withStyles, CardContent } from '@material-ui/core';
import PostList from '..';

const useStyles = theme => ({
    root: {
        minWidth: 1300,
        maxWidth: 1300,
    },
    title: {
        fontSize: 36,
    },
    content: {
        fontSize: 14,
    }, 
    author: {
        fontSize: 12,
    }
})

const classes = useStyles();


class Post extends Component{
    
    render() {
        const { post, stackComponent, permission, classes } = this.props;



        return (
            <div>
                <Card className={classes.root} variant="outlined">
                    <CardContent className={classes.title}>
                        <div className={classes.author}>
                            {post.author} posted on {post.date}
                        </div>
                        <Divider />
                        {post.title}
                        <Divider />
                        <div className={classes.content}>
                            <div dangerouslySetInnerHTML={{__html: post.content}}/>
                        </div>
                        <div className={classes.content}>
                        <Divider />
                        <p>Comments:</p>
                        <Divider variant="middle"/>
                        <CommentList comments={post.comments} stack={this}/>
                        </div>
                    </CardContent>
                </Card>

                <Divider/>
                <Reply/>
                {/* use state to tell whether current user has permission to delete a post */}
                {permission && (
                    <Button variant="contained"
                        onClick={()=>removePost(stackComponent, post)}>Delete Post</Button>
                )}
            </div>
        )
    }
    


}

export default withStyles(useStyles)(Post);