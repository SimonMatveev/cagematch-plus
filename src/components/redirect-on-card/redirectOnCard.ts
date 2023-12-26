import { CLASS_LIST_ITEM } from '../../utils/classes';
import { UTILS_ACTIVE_NAME } from '../../utils/constants';
import { REGEXP_ID_1, REGEXP_PAGE_3 } from '../../utils/regexps';

const redirectOnCard = () => {
  const links = document.querySelectorAll<HTMLLinkElement>('a');
  [...links].forEach(link => {
    if (REGEXP_ID_1.test(link.href) && !REGEXP_PAGE_3.test(link.href) && !link.closest('li')?.classList.contains(CLASS_LIST_ITEM)) {
      link.href += '&page=3';
    }
  });
};

chrome.storage.sync.get(UTILS_ACTIVE_NAME)
  .then(res => {
    if (res[UTILS_ACTIVE_NAME].redirectOnCard) {
      redirectOnCard();
    }
  })
  .catch(err => console.log(err));
