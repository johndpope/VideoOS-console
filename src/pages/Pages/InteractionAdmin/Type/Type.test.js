import React from 'react';
import ReactDOM from 'react-dom';
import Type from './Type';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Type />, div);
  ReactDOM.unmountComponentAtNode(div);
});
