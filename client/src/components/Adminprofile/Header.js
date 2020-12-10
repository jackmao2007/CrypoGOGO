import React, { Component } from 'react';
import './Profile.css';


class Header extends Component {
	    constructor(props) {
      super(props);
    this.state = { 
    	show: false, 
    	imageList: []
    }
      }

	addImage = (form, dashboardComp) => {
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
	    fetch(request)
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


	getImages = (imageListComp) => {
	    // the URL for the request
	    const url = "/images";

	    // Since this is a GET request, simply call fetch on the URL
	    fetch(url)
	        .then(res => {
	            if (res.status === 200) {
	                // return a promise that resolves with the JSON body
	                return res.json();
	            } else {
	                alert("Could not get Profile");
	            }
	        })
	        .then(json => {
	            // the resolved promise with the JSON body
	            imageListComp.setState({ imageList: json.images });
	        })
	        .catch(error => {
	            console.log(error);
	        });
	};

	onClick = () => {
        this.setState({ show: !this.props.show });
    }

    	upload = () => {
		if (!this.state.show) {
        return  <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    this.addImage(e.target, this.props);
                }}>
                  <div className="image-form_field">
                        <label>Image:</label>
                        <input name="image" type="file" />
                   </div>
                    <button onClick={(e) => this.onClick()}>Upload</button>
                </form>;
      }
	}

	show = () => {
		if (this.state.show) {
        return  <div>
        			<button onClick={() => this.getImages(this)}>Show</button>
        			 <div className='ProfileCircle'>
        			 {this.state.imageList.map(image => image)}
       				 </div>
                </div>;
      }

	}



    render() { 
        return (
        	 <div className="ProfileCirclecontainer">  
        	 	{this.upload()}
        	 	{this.show()}
            </div>
         );
    }
}
 
export default Header;