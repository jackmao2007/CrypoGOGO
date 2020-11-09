function updateID(stack) {
    for (let i = 0; i< stack.length; i++){
        stack[i].postID = i;
    }
    console.log(stack);
}


export const addPost = stack => {
    const postList = stack.state.posts;
    const newPostID = postList.length

    const post = {
        postID: newPostID, title: stack.state.topic, 
        author: "sbNEW", content: stack.state.content, date: "date: 20201111"
    };
    
    postList.push(post);

    updateID(postList);

    stack.setState({
        posts: postList
    });
    stack.handleClose()
};



export const removePost = (stack, post) => {
    const postList = stack.state.posts;
    const notDeletedPosts = stack.state.posts.filter(p => {
        return p !== post;
    })

    updateID(notDeletedPosts);

    stack.setState({
        posts: notDeletedPosts
    })
    
    

}

export const addComment = stack => {
    const commentList = stack.state.value

    const comment = {
        
    }
}