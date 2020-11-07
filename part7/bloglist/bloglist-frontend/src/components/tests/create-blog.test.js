import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlog from '../create-blog';

test('creating blog calls right function with right parameters', () => {
  const newBlog = {
    title: 'Tule viihtymään!',
    author: 'IO-virta',
    url: 'kuisti.org'
  };

  const addBlog = jest.fn();

  const component = render(
    <CreateBlog addBlog={addBlog}/>
  );

  const btn = component.getByText('create blog');
  fireEvent.click(btn);

  const form = component.container.querySelector('form');

  Object.keys(newBlog).forEach(key => {
    fireEvent.change(component.container.querySelector(`#${key}`), {
      target: { value: newBlog[key] }
    });
  });

  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toMatchObject(newBlog);
});
