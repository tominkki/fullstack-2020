import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../Blog';

const blog = {
  id: '5f857eeddcf2c43370ea4dc2',
  likes: 3,
  title: 'Jamix leipoo',
  author: 'webmaster',
  url: 'safk.at',
  user: '5f806b962dbb1934c5650571'
};

const user = {
  id: '5f806b962dbb1934c5650571',
  blogs: ['5f857eeddcf2c43370ea4dc2'],
  username: 'niilo22',
  name: 'lempäälän kuningas'
};

test('renders only title and author by default', () => {
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

test('renders url and likes when show button is clicked', () => {
  const component = render(
    <Blog blog={blog} user={user}/>
  );

  const btn = component.getByText('show');
  fireEvent.click(btn);

  expect(component.container).toHaveTextContent(
    'url: safk.at'
  );
  expect(component.container).toHaveTextContent(
    'likes: 3'
  );
});
