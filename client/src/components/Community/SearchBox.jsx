import { TextField, withStyles } from '@material-ui/core';
import React, { Component } from 'react';


const useStyles = theme => ({
    searchbar: {
        minWidth: 400,
        maxWidth: 400,
    },
});

const classes = useStyles();

class SearchBox extends Component {

    render() {
        const { classes , handleSearchInput} = this.props;

        return (
            <div>
                <TextField 
                className = {classes.searchbar} 
                id="filled-secondary"
                label="Search Post"
                variant="filled"
                onChange={handleSearchInput}
                />               
            </div>
        )
    }

}


export default withStyles(useStyles)(SearchBox);