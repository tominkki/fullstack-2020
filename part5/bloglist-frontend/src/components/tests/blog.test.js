import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from '../Blog';

test('renders only title and author by default', () => {
  const blog = {
    id: '5f857eeddcf2c43370ea4dc2',
    likes: 3,
    title: 'Jamix leipoo',
    author: 'webmaster',
    url: 'safk.at',
    user: '5f806b962dbb1934c5650571'
  };

  const component = render(
    <Blog blog={blog}/>
  );

  expect(component.container).toHaveTextContent(
    'Jamix leipoo by webmaster'
  );

  expect(component.container).not.toHaveTextContent(
    'url'
  );

  expect(component.container).not.toHaveTextContent(
    'likes'
  );
});
