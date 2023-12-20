import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './favEvents';

chrome.storage.sync.get('utilsActive')
  .then(res => {
    if (res.utilsActive.favEvents) {
      const root = document.createElement('div');
      root.id = "crx-root-3";
      document.querySelector('.LayoutContent')?.prepend(root);

      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  })
  .catch(err => console.log(err));
