import React from "react";
import ReactDOM from "react-dom/client";
import App from './event';

const insertAfter = (referenceNode: Node, newNode: Node) => {
  referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}

chrome.storage.sync.get('utilsActive')
  .then(res => {
    if (res.utilsActive.event) {
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
