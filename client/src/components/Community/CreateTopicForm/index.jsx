import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import { Form } from 'antd';
import 'antd/dist/antd.css'
import { withStyles } from '@material-ui/core';

const FormItem = Form.Item;

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ]
}

const formats = [
    'header', 'font', 'background', 'color', 'code', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'script', 'align', 'direction',
    'link', 'image', 'code-block', 'formula', 'video'
  ]

const useStyles = theme => ({
    newpost: {
        maxWidth: 400,
        minWidth: 400,
        marginTop: 5,
        marginBottom: 5,
    },
})

const classes = useStyles();

class CreateTopicForm extends React.Component {
    render() {
        const {
            open,
            topic,
            content,
            handleChange,
            handleClose,
            handleClickOpen,
            onValueChange,
            // position,
            handleSubmit,
            classes
        } = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" className={classes.newpost}
                    onClick={handleClickOpen}>
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
                    {/* <TextField
                        required
                        name="content"
                        label="Content"
                        multiline
                        rows={8}
                        value={content}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    /> */}
                    <Form style={{ minHeight:400 }}>
                        <ReactQuill style={{height:300}}
                            value={content}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            onChange={onValueChange} />
                    </Form>
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

export default withStyles(useStyles)(CreateTopicForm);