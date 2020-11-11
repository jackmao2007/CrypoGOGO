import React, { Component } from 'react';
import "./styles.css"
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


import "./styles.css";


class PostComment extends Component{

    render() {
        const { comment, stack } = this.props;

        return (
            <TableRow className="comment" key={comment.username}>
            <TableCell style={{ width: 80 }} component="th" scope="row">
              {comment.username}:
            </TableCell>
    
            <TableCell component="th" scope="row">
              {comment.text}
            </TableCell>
    
            {/* <TableCell component="th" scope="row">
              <Button
                variant="contained"
                color="secondary"
                onClick={
                  () => removeComment(stack, comment)
                }
              >
                remove
              </Button>
            </TableCell> */}
          </TableRow>
        )
    }




}

export default PostComment;