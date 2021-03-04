import React from 'react';
import renderer from 'react-test-renderer';
import Button from './button';

it('renders correctly', () => {
  const tree = renderer
    .create((
        <Button onClick={() => {}}>
            Click me
        </Button>
    ))
    .toJSON();
  expect(tree).toMatchSnapshot();
});