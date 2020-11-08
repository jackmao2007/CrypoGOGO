import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class CreateTopicForm extends React.Component {
    render() {
        const {
            open,
            topic,
            content,
            handleChange,
            handleClose,
            handleClickOpen,
            // position,
            handleSubmit
        } = this.props;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Create New Post
                </Button>
                <Dialog 
                    fullWidth={1000} 
                    open={open} 
                    onClose={this.handleClose} 
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">New Post</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        name="topic"
                        label="Topic"
                        variant="outlined"
                        value={topic}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        required
                        name="content"
                        label="Content"
                        multiline
                        rows={8}
                        value={content}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    {/* <Reply/> */}
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CreateTopicForm;