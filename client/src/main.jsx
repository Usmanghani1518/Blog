import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import  {store,presiststore}  from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={presiststore}>
    <Provider store={store}>
    <App />
    </Provider>
    </PersistGate>
  </React.StrictMode>
);


