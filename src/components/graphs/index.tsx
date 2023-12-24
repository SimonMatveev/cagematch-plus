import React from "react";
import ReactDOM from "react-dom/client";
import App from './graphs';
import { UTILS_ACTIVE_NAME } from '../../utils/constants';
import { CLASS_LAYOUT_CONTENT } from '../../utils/classes';

chrome.storage.sync.get(UTILS_ACTIVE_NAME)
  .then(res => {
    if (res[UTILS_ACTIVE_NAME].graphs) {
      const root = document.createElement("div");
      root.id = "crx-root-2";
      document.querySelector(CLASS_LAYOUT_CONTENT)?.append(root);

      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  })
  .catch(err => console.log(err));