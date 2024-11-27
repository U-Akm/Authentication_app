import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; // This line might cause issues if not used properly

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Make sure reportWebVitals is used correctly or commented out if not needed
reportWebVitals(); // <-- This line is what causes the error if it's not set up properly
