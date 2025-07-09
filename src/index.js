import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App'; // ← imports your main app component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
