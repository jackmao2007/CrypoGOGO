import React from "react";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import PostComment from "./PostComment";

class CommentList extends React.Component {
    render() {
      const { comments } = this.props;
  
      /* Our student list.  We use the state to iterate through the 
         student list and make an <li> for each one. */
      return (
        <Table className="comment-list">
          <TableBody>
            {comments.map(comment => (
              <PostComment
                key={uid(
                  comment
                )} /* unique id required to help React render more efficiently when we modify the students list. */
                comment={comment}
              />
            ))}
          </TableBody>
        </Table>
      );
    }
  }
  
  export default CommentList;