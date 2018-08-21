import React from 'react';
import ReactDOM from 'react-dom';
import Meterial from './MoMeterialdel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Meterial />, div);
  ReactDOM.unmountComponentAtNode(div);
});
