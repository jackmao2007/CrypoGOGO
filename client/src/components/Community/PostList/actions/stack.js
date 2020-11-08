export const addPost = stack => {
    const postList = stack.state.posts;
    const newPostID = postList.length

    const post = {
        postID: newPostID, title: "ahh"+`${newPostID}`, 
        author: "sbNEW", content: "ahhhhhhhhhhNEW", date: "20201111"
    };
    
    postList.push(post);

    console.log(postList)

    stack.setState({
        posts: postList
    });
};



export const removePost = (stack, post) => {
    const notDeletedPosts = stack.state.posts.filter(p => {
        return p !== post;
    })

    stack.setState({
        posts: notDeletedPosts
    })
    

}