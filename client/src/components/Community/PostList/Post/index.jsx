import React, { Component } from 'react';
import PostComment from "./PostComment"
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button"
import { removePost } from "../actions/stack"
import CommentList from './CommentList'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Reply from './Reply'
import { Card, withStyles, CardContent } from '@material-ui/core';
import PostList from '..';

const useStyles = theme => ({
    root: {
        minWidth: 1300,
        maxWidth: 1300,
        marginTop: -120,
        marginBottom: 30,
    },
    title: {
        fontSize: 36,
        paddingTop: 10,
        paddingBottom: 10,
    },
    content: {
        fontSize: 14,
        paddingTop: 20,
        paddingBottom: 20,
    }, 
    author: {
        fontSize: 12,
    },
    comments: {
        mariginTop: 10,
        marginBottom: 20,
    },
    likebutton: {
        marginTop: 5,
        marginBottom: -35,
    },
})

const classes = useStyles();


class Post extends Component{
    state = {likenum: 0}
    handellike = () => {
        this.setState({likenum: this.state.likenum + 1})
    }
    
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
                        <div className={classes.likebutton}>
                        <Button onClick={this.handellike} variant="contained" color="secondary"
                            startIcon={<FavoriteIcon />}> 
                            Like! {this.state.likenum} </Button>
                        </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className={classes.comments} variant="outlined">
                    <CardContent>
                        <div>
                        <p>Comments:</p>
                        <Divider/>
                        {
                            (post.comments.length>0)? <CommentList comments={post.comments} stack={this}/>: null
                        }
                        
                        </div>
                    </CardContent>
                </Card>

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