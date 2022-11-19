import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { configureStore } from "./store";

const store = configureStore();
console.log(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


