import TV_SHOWS from "./utils/tvShows";
import UTILS_ACTIVE from "./utils/utilsActive";

chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

chrome.runtime.onInstalled.addListener(
  () => {
    chrome.storage.sync.set({
      utilsActive: UTILS_ACTIVE,
      showsActive: TV_SHOWS,
    });
  });
