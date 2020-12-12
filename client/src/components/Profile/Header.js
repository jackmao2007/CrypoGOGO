import React, { Component } from 'react';
import './Profile.css';
import { addImage, getImage } from "./actions/image" ;
import CardMedia from '@material-ui/core/CardMedia';


class Header extends Component {
	constructor(props) {
      	super(props);
      	this.state = { 
    		show: false, 
    		imageList: []
    	}
     }


	onClick = () => {
        this.setState({ show: !this.props.show });
    }

    upload = () => {
		if (!this.state.show) {
        return  ( 
        	 <div className="ProfileCirclecontainer">  
        	<form onSubmit={(e) => {
                    e.preventDefault();
                    addImage(e.target, this.props);
                }}>
                  <div>
                        <h4>Upload Your Profile:</h4>
                        <input name="image" type="file" />
                        <button onClick={(e) => this.onClick()}>Upload</button>
                                       </div>

                </form>
                </div>)
      } else {
      	getImage(this);
      }
	}

	show = () => {
		
		if (this.state.show) {
        return  <div className="ProfileCircle">
        			 {this.state.imageList.map(image => (
                             <img src="${this.state.imageList.image_url}" />
                    ))}
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