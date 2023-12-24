import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './favEvents';
import { UTILS_ACTIVE_NAME } from '../../utils/constants';
import { CLASS_LAYOUT_CONTENT } from '../../utils/classes';

chrome.storage.sync.get(UTILS_ACTIVE_NAME)
  .then(res => {
    if (res[UTILS_ACTIVE_NAME].favEvents) {
      const root = document.createElement('div');
      root.id = "crx-root-3";
      document.querySelector(CLASS_LAYOUT_CONTENT)?.prepend(root);

      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  })
  .catch(err => console.log(err));
