import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user-reducer';

import AppBar from '@material-ui/core/AppBar';
import TypoGraphy from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logout: {
    marginLeft: 'auto',
    marginRight: theme.spacing(2)
  }
}));

const Navigation = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const styles = useStyles();

  if(!user) {
    return(
      <div>
        <AppBar color='primary' position='static'>
          <Toolbar>
            <TypoGraphy variant='title' color='inherit'>
              BlogApp
            </TypoGraphy>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  return (
    <div>
      <AppBar color='primary' position='static'>
        <Toolbar>
          <TypoGraphy variant='title' color='inherit'>
            BlogApp
          </TypoGraphy>
          <List component='nav'>
            <ListItem component='div'>
              <ListItem button component={Link} to='/'>
                <ListItemText>
                  <TypoGraphy color='inherit' variant='title' >
                  Blogs
                  </TypoGraphy>
                </ListItemText>
              </ListItem>
              <ListItem button component={Link} to='/users'>
                <ListItemText>
                  <TypoGraphy color='inherit' variant='title' >
                  Users
                  </TypoGraphy>
                </ListItemText>
              </ListItem>
            </ListItem>
          </List>
          <Button className={styles.logout} color='inherit' onClick={() => dispatch(logout())}>
            <ExitToAppIcon/>
            <TypoGraphy color='inherit' variant='title' >
              LOGOUT
            </TypoGraphy>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
