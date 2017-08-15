import React from 'react';
import ReactDOM from 'react-dom';
import ReportRunner from './ReportRunner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReportRunner />, div);
});
