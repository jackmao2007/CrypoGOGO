const log = console.log

export const addImage = (form, dashboardComp) => {
	    // the URL for the request
	    const url = "/images";

	    // The data we are going to send in our request
	    const imageData = new FormData(form);

	    // Create our request constructor with all the parameters we need
	    const request = new Request(url, {
	        method: "post",
	        body: imageData,
	    });

	    // Send the request with fetch()
	    fetch(request, {
            headers: {
                'Accept': 'application/json'
            }
     	 })
	        .then(function (res) {
	            // Handle response we get from the API.
	            // Usually check the error codes to see what happened.
	            if (res.status === 200) {
	                // If image was added successfully, tell the user.
	                dashboardComp.setState({
	                    message: {
	                        body: "Success: Added an profile.",
	                        type: "success"
	                    }
	                });
	            } else {
	                // If server couldn't add the image, tell the user.
	                // Here we are adding a generic message, but you could be more specific in your app.
	                dashboardComp.setState({
	                    message: {
	                        body: "Error: Could not add a profile.",
	                        type: "error"
	                    }
	                });
	            }
	        })
	        .catch(error => {
	            console.log(error);
	        });
	};



export const getImage = async (imageListComp) => {
	const url = "/images";
	fetch(url,{
        headers: {
           'Accept': 'application/json'
        }
    })
    .then(res => {
        if (res.status === 200) {
                  // return a promise that resolves with the JSON body
            return res.json();
        } else {
            alert("Could not get images");
        }
    })
    .then(json=> {
         // the resolved promise with the JSON body
        imageListComp.setState({ imageList: json.images });
    })
    .catch(error => {
         console.log(error);
    });  
};