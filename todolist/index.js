import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { nanoid } from "nanoid";

const DATA = [
  { id: `${nanoid()}`, name: "Eat", completed: true },
  { id: `${nanoid()}`, name: "Sleep", completed: false },
  { id: `${nanoid()}`, name: "Repeat", completed: false }
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);
reportWebVitals();
