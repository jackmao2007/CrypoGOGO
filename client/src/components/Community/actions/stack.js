export const addPost = (newPostComp) => {
    // URL for the req
    const url = `/api/posts`;
    // the data to send in req
    const post = newPostComp.state;
    console.log(post);

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(post),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    console.log(request)

    // send the request 
    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                // post added successfully
                console.log("post added")
            } else {
                console.log(res.status)
            }
        }).catch(error => {
            console.log(error)
        });
}


export const getPosts = async (community) => {
    try {
        const url = `/api/posts`;
        const resp = await fetch(url);
        const posts = await resp.json()
        community.setState({
            postList: posts
        })
    } catch (error) {
        console.log(error)
    }
}


export const searchPost = (community) => {
    // pointers
    const kw = community.state.searchKeyWord;
    const posts = community.state.postList;

    let result = []
    posts.forEach((post) => {
        if (post.title.toLowerCase().search(kw) != -1 ||
            post.content.toLowerCase().search(kw) != -1) {
            result.push(post)
        }
    });
    try {
        if (result.length === 0) {
            const noResult = {
                title: "No Result!",
                author: "xxx",
                content: "No result",
                date: "xxx",
                comments: [{
                    username: "xxx",
                    text: "xxx"
                }]
            }
            return [noResult]
        } else {
            return result
        }
    } catch (error) {
        console.log(error);
    }

}

export const likePost = (postID) => {
    // URL for the req
    const url = `/api/posts/like/` + postID 
    // the data to send in req

    const request = new Request(url, {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                console.log("post liekd!!")
            } else {
                console.log(res.status, "link front and back")
            }
        }).catch(error => {
            console.log(error)
        });
}

export const deletePost = (postID) => {
    const url = 'api/posts/'+ postID;
    const request = new Request(url, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    fetch(request).then((res) => {
        if (res.status === 200){
            console.log(" post deleted!")
        } else {
            console.log(res.status)
        }
    }).catch(error => {
        console.log(error)
    })
}