import React from "react";
import Post from "./Post/index";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 800,
    textTransform: "none"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    textTransform: "none",
    minWidth: 500,
    minHeight: 100,
    textAlign: "left",
  }
}));

export default function PostList(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className={classes.root}>
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      className={classes.tabs}
    >
    {props.posts.map((post) => {
        return (
          <Tab key={post.postID} label={post.title} className={classes.tab}/>
        );
      })}
    </Tabs>
    {props.posts.map((post) => {
      return (
        <TabPanel value={value} index={post.postID}>
          <Post post={post} stackComponent={props.stackComponent} />
        </TabPanel>
      );
    })}
  </div>
  );
}

