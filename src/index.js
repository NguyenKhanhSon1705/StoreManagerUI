import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import App from './App';
import GlobalStyles from './components/globalStyles/GlobalStyles';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>

      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  // </React.StrictMode>
);
reportWebVitals();
