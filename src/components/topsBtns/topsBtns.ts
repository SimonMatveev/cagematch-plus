import { CLASS_PROFILE_MENU } from '../../utils/classes';
import { TOP_BTNS, UTILS_ACTIVE_NAME } from '../../utils/constants';
import { createListItem } from '../../utils/functions';

const createBtns = () => {
  const menu = document.querySelector<HTMLUListElement>(CLASS_PROFILE_MENU);

  if (menu) {
    menu.append(createListItem(TOP_BTNS.BEST_MATCHES.URL, TOP_BTNS.BEST_MATCHES.NAME));
    menu.append(createListItem(TOP_BTNS.EVENTS.URL, TOP_BTNS.EVENTS.NAME));
  }
};

chrome.storage.sync.get(UTILS_ACTIVE_NAME)
  .then((res) => {
    if (res[UTILS_ACTIVE_NAME].topsBtns) {
      createBtns();
    }
  })
  .catch(err => console.log(err));
