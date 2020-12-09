// environment, just using now for test
const API_HOST = 5000


function updateID(stack) {
    for (let i = 0; i < stack.length; i++) {
        stack[i].postID = i;
    }
}


export const addPost = stack => {
    const postList = stack.state.posts;
    const newPostID = () => {
        const len = postList.length;
        if (len == 0) {
            return 0;
        } else {
            return postList[postList.length - 1].postID + 1
        }
    }

    const post = {
        postID: newPostID,
        title: stack.state.topic,
        author: "UserNew",
        content: stack.state.content,
        date: "date: 20201111",
        comments: []
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

export function searchByKeyWord(stack, keywords) {
    // deep copy the oringinal list in case that will change
    const postList = Array.from(stack.state.posts);
    var newList = [];
    if (keywords == "") {
        newList = Array.from(postList);
    } else {
        var isInclude = Array(postList.length).fill(0);
        for (let i = 0; i < postList.length; i++) {
            if (postList[i].content.toLowerCase().search(keywords) != -1 ||
                postList[i].title.toLowerCase().search(keywords) != -1 ||
                postList[i].author.toLowerCase().search(keywords) != -1
            ) {
                isInclude[i] = 1
            }
        }
        console.log(isInclude);
        if (isInclude.every((i) => i == 0)) {
            const noResult = {
                postID: 0,
                title: "No Result!",
                author: "xxx",
                content: "No result",
                date: "xxx",
                comments: [{
                    username: "xxx",
                    text: "xxx"
                }]
            }
            newList.push(noResult);
        } else {
            for (let i = 0; i < postList.length; i++) {
                if (isInclude[i] == 1) {
                    console.log(postList[i])
                    newList.push(postList[i])
                }
            }
        }
    }
    console.log(newList)
    return newList;
}

export const addComment = stack => {
    const commentList = stack.state.value

    const comment = {

    }
}




// back-end functions 

export const addPostBE = (newPostComp, postsComp) => {
    // URL for the req
    const url = `${API_HOST}/api/posts`;
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

    // send the request 
    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                // post added successfully
                console.log("post added")
            } else {
                const errorno = res.status
                console.log(errorno)
            }
        }).catch(error => {
            console.log(error)
        });
}


export const getPosts = (postList) => {
    // URL for the req
    const url = `${API_HOST}/api/posts/postslist`;


    // send the request 
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                alert("Could not find posts")
            }
        })
        .then(json => {
            postList.setState({ postList: json.posts})
        })
        .catch(error => {
            console.log(error)
        })
}




