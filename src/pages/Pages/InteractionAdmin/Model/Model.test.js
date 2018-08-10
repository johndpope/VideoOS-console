import React from 'react';
import ReactDOM from 'react-dom';
import Model from './Model';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Model />, div);
  ReactDOM.unmountComponentAtNode(div);
});
