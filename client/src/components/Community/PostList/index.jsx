import React, { Component } from "react";
import Post from "./Post/index";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
class PostList extends Component {
  render() {
    const { posts, stackComponent } = this.props;

    return (
      <div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
        >
          {posts.map((post) => {
            return (
              <Tab key={post.postID} label={post.title}  />
            );
          })}
        </Tabs>
        {posts.map((post) => {
          return (
            <TabPanel value={post.postID} index={post.postID}>
              <Post post={post} stackComponent={stackComponent} />
            </TabPanel>
          );
        })}
      </div>
    );
  }
}

export default PostList;
