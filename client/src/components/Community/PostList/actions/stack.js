function updateID(stack) {
    for (let i = 0; i< stack.length; i++){
        stack[i].postID = i;
    }
}


export const addPost = stack => {
    const postList = stack.state.posts;
    const newPostID = postList[postList.length - 1].postID + 1

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