import React from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/hooks';
import { login } from '../reducers/user-reducer';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TypoGraphy from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  grid: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  }
}));


const LoginForm = () => {

  const dispatch = useDispatch();

  const username = useField('text');
  const password = useField('password');

  const submitCreds = e => {
    console.log('yo');
    e.preventDefault();
    console.log('wat');
    dispatch(login({
      username: username.input.value,
      password: password.input.value
    }));
    [username, password].map(state => state.reset);
  };

  const styles = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <TypoGraphy component='h1' variant='h5'>
          Log in to application
        </TypoGraphy>
        <form className={styles.form} noValidate onSubmit={submitCreds}>
          <div className={styles.grid}>
            <Grid container spacing={1} alignItems='flex-end' justify='center'>
              <Grid item>
                <AccountCircleOutlinedIcon/>
              </Grid>
              <Grid item>
                <TextField id='username' label='Username' fullWidth {...username.input}/>
              </Grid>
            </Grid>
          </div>
          <div className={styles.grid}>
            <Grid container spacing={1} alignItems='flex-end' justify='center'>
              <Grid item>
                <VpnKeyOutlinedIcon/>
              </Grid>
              <Grid item>
                <TextField id='pass' label='Password' {...password.input}/>
              </Grid>
            </Grid>
          </div>
          <Button type='submit' fullWidth variant='contained'
            color='primary' className={styles.button}>
              Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
