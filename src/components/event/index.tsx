import React from "react";
import ReactDOM from "react-dom/client";
import App from './event';
import { UTILS_ACTIVE_NAME } from '../../utils/constants';

const insertAfter = (referenceNode: Node, newNode: Node) => {
  referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}

chrome.storage.sync.get(UTILS_ACTIVE_NAME)
  .then(res => {
    if (res[UTILS_ACTIVE_NAME].event) {
      const root = document.createElement("div");
      root.id = "crx-root-1";
      insertAfter(document.body, root)

      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  })
  .catch(err => console.log(err));
