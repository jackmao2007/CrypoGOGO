import React from "react";
import Post from "./Post/index";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from "@material-ui/core";


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
    borderRight: `2px solid #9e9e9e`,    
  },
  tab: {
    textTransform: "none",
    textAlign: "left",
    minWidth: 400,
    maxWidth: 400,
    minHeight: 100,
    maxHeight: 150,
    borderBottom: `1px solid #9e9e9e`,
    borderTop: `1px solid #9e9e9e`,
    backgroundColor: "#e0f2f1",
  },
  label: {
    paddingLeft: '10px',
    marginBottom: '20px',
  },
  heading: {
    // border: `3px solid #73AD21`,
    width: 380,
    margin: `1px`
  }
}));

function PostSummary(props) {
  const { title, author, date, summary } = props;
  const classes = useStyles();

  return (
    <div className={classes.heading}>
      <h6><strong>{ title }</strong></h6>
      <Divider/>
      <span> { summary } </span>
      <Divider/>
      <span> <strong> { author } </strong> posted on { date }</span>
    </div>
  )
}

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
      indicatorColor = 'primary'
      onChange={handleChange}
      className={classes.tabs}
    > 
    {props.posts.slice(0).reverse().map((post, index) => {
        return (
          <Tab key={index} 
          label=  { 
          <PostSummary title={post.title} author={post.author} date={post.date} summary={post.content.slice(0, 100)}
          className = {classes.label}
          />} 
          className={classes.tab}/>
        );
      })}
    </Tabs>
    {props.posts.slice(0).reverse().map((post, index) => {
      return (
        <TabPanel key={index} value={value} index={index}>
          <Post post={post} stackComponent={props.stackComponent} permission={props.permission} />
        </TabPanel>
      );
    })}
  </div>
  );
}

