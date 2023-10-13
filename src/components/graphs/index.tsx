import React from "react";
import ReactDOM from "react-dom/client";
import App from './graphs';

chrome.storage.sync.get('utilsActive')
  .then(res => {
    if (res.utilsActive.graphs) {
      const root = document.createElement("div");
      root.id = "crx-root-2";
      document.querySelector('.LayoutContent')?.append(root);

      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  })
  .catch(err => console.log(err));