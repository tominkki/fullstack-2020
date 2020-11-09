import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TypoGraphy from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

const BlogList = () => {

  const blogs = useSelector(state => state.blogs);
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const styles = useStyles();

  return(
    <Container component='main' maxWidth='md'>
      <div className={styles.root}>
        <List component='nav'>
          <ListItemText>
            <TypoGraphy component='h1' variant='h5' >
         Blogs
            </TypoGraphy>
          </ListItemText>
          {sortedBlogs.map( blog =>
            <>
              <Divider/>
              <ListItem button component={Link} to={`/blogs/${blog.id}`}>
                <ListItemText>{blog.title} by {blog.author}</ListItemText>
              </ListItem>
            </>
          ) }
        </List>
      </div>
    </Container>
  );
};

export default BlogList;
