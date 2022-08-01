import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import './index.css';
import rootReducer from './reducers'
import { createStore } from 'redux';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={createStore(rootReducer)}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

