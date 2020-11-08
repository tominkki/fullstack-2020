import React from 'react';
import { useDispatch } from 'react-redux';
import { newComment } from '../reducers/blog-reducer';
import { useField } from '../hooks/hooks';

const CommentForm = ({id}) => {

  const dispatch = useDispatch();
  const comment = useField('text');

  const submitComment = () => {
    dispatch(newComment(
      id,
      {comment: comment.input.value}
    ));
  };

  return(
    <div>
      <form onSubmit={submitComment}>
        <input {...comment.input}/>
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm;
