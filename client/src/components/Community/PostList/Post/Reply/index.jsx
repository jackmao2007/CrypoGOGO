import React, { Component } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import { Form, Button } from 'antd';
import 'antd/dist/antd.css'

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

class Reply extends React.Component {

    state = {
        value: '',
    }


    onValueChange = (value) => {
        console.log(this.state.value);
        this.setState({
            value
        })
    }

    handleSubmit = () => {
        //addComment(this)
        console.log(this.state.value);
    }

    render() {
        const { value } = this.state
        
        return (
            <div>
                <Form style={{ minWidth: 370, maxWidth: '66%', minHeight:250 }} onSubmit={this.handleSubmit}>
                <ReactQuill
                    value={value}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    onChange={this.onValueChange} />
                <FormItem style={{ margin: '10px 0px' }}>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} >Submit</Button>
                </FormItem>
                </Form>
            </div>
        )
    }
}

export default Reply;