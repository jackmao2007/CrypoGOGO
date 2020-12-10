import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button"
import FavoriteIcon from '@material-ui/icons/Favorite';
import Reply from './Reply'
import { Card, withStyles, CardContent } from '@material-ui/core';
import moment from 'moment'
import { likePost, deletePost } from "../../actions/stack" 

const useStyles = theme => ({
    root: {
        minWidth: 1300,
        maxWidth: 1300,
        marginTop: -120,
        marginBottom: 30,
    },
    title: {
        fontSize: 40,
        paddingTop: 10,
        paddingBottom: 10,
    },
    content: {
        fontSize: 18,
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
    handellike = () => {
        const postID = this.props.post._id;
        likePost(postID)
    }

    dateToStr = (date) => {
        const d = moment(date).format('YYYY-MM-DD hh:mm a')
        return d
    }
    
    render() {
        const { post,  permission, classes } = this.props;


        return (
            <div>
                <Card className={classes.root} variant="outlined">
                    <CardContent className={classes.title}>
                        <div className={classes.author}>
                            {post.author} posted on {this.dateToStr(post.createDate)}
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
                            Like! {this.props.post.like} </Button>
                        </div>
                        </div>
                    </CardContent>
                </Card>
                {/* <Card className={classes.comments} variant="outlined">
                    <CardContent>
                        <div>
                        <p>Comments:</p>
                        <Divider/>
                        {
                            (post.comments.length>0)? <CommentList comments={post.comments} stack={this}/>: null
                        }
                        
                        </div>
                    </CardContent>
                </Card> */}

                <Reply/>
                
                {permission && (
                    <Button variant="contained"
                        onClick={()=>deletePost(post._id)}>Delete Post</Button>
                )}
            </div>
        )
    }
    


}

export default withStyles(useStyles)(Post);