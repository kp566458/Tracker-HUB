import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  commentInput: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  commentButton: {
    marginTop: theme.spacing(2),
  },
  commentList: {
    marginTop: theme.spacing(2),
  },
}));

function CommentSystem() {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  }

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.commentInput}
          label="Add a comment"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <Button
          className={classes.commentButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <List className={classes.commentList}>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default CommentSystem;
