import { Row, Spin } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import App from './App';
import './index.css';
import store, { persistStore } from './redux/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <Row
            style={{
              width: '100vw',
              height: '100vh',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Spin size="large" spinning />
          </Row>
        }
        persistor={persistStore}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
