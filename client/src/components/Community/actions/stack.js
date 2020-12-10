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


export const getPosts = async (community) => {
    try{
        const url = `/api/posts`;
        const resp = await fetch(url);
        const posts = await resp.json()
        community.setState({ postList: posts })
    }catch(error){
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
            post.content.toLowerCase().search(kw) != -1 ) {
            result.push(post)
        }
    });
    try{
        if(result.length === 0){
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
        }else{
            return result
        }
    }catch(error){
        console.log(error);
    }

}






