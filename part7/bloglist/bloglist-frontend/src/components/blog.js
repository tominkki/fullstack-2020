import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { like, remove } from '../reducers/blog-reducer';
import CommentForm from './comment-form';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(5)
  }
}));


const Blog = ({ blog }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user);

  const styles = useStyles();

  if(!blog) return null;

  return(
    <Container component='main' maxWidth='sm'>
      <Card className={styles.root} variant='outlined'>
        <CardContent>
          <Typography variant='h5'>
            {blog.title}
          </Typography>
          <Typography color='textSecondary' variant='body3'>
          by {blog.author}
          </Typography>
          <Divider/>
          <List>
            {blog.comments.map((comment, i) =>
              <ListItem key={i}>
                <ListItemIcon>
                  <ChatBubbleOutlineOutlinedIcon fontSize='small'/>
                </ListItemIcon>
                <ListItemText>
                  {comment}
                </ListItemText>
              </ListItem>
            )}
          </List>
          <CommentForm id={blog.id}/>
        </CardContent>
        <Divider/>
        <CardActions>
          <Button size='small' onClick={() => dispatch(like(blog))}>
            <FavoriteBorderOutlinedIcon/>
            {blog.likes}
          </Button>
          <Button size='small' href={blog.url}>
           LEARN MORE
          </Button>
          {user.id === blog.user.id &&
        <Button onClick={() => {dispatch(remove(blog)); history.push('/');}}>
          <DeleteOutlineOutlinedIcon/>
          remove
        </Button>
          }
        </CardActions>
      </Card>
    </Container>

  );
};

export default Blog;
