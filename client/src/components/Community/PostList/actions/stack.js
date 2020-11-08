export const addPost = stack => {
    const postList = stack.state.posts;
    const newPostID = postList.length

    const post = {
        postID: newPostID, title: stack.state.topic, 
        author: "sbNEW", content: stack.state.content, date: "date: 20201111"
    };
    
    postList.push(post);

    console.log(postList)

    stack.setState({
        posts: postList
    });
    stack.handleClose()
    
};



export const removePost = (stack, post) => {
    const notDeletedPosts = stack.state.posts.filter(p => {
        return p !== post;
    })

    stack.setState({
        posts: notDeletedPosts
    })
    

}

export const addComment = stack => {
    const commentList = stack.state.value

    const comment = {
        
    }
}