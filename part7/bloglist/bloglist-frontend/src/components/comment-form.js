import React from 'react';
import { useDispatch } from 'react-redux';
import { newComment } from '../reducers/blog-reducer';
import { useField } from '../hooks/hooks';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const CommentForm = ({ id }) => {

  const dispatch = useDispatch();
  const comment = useField('text');

  const submitComment = () => {
    dispatch(newComment(
      id,
      { comment: comment.input.value }
    ));
  };

  const styles = useStyles();

  return(
    <Container component='main' maxWidth='sm'>
      <form className={styles.form} noValidate onSubmit={submitComment}>
        <Grid container spacing={5} alignItems='flex-end' justify='center'>
          <Grid item>
            <TextField label='Add comment' fullWidth {...comment.input}/>
          </Grid>
          <Grid item>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              endIcon={<SendOutlinedIcon/>}>
            Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CommentForm;
