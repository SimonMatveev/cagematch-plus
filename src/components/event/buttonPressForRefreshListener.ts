import { UTILS_ACTIVE_NAME } from '../../utils/constants';
import { REGEXP_GET_ID } from '../../utils/regexps';

// Если на странице матча и есть кнопка  Add comment and/or rating или Edit, то отслеживаем нажатие на нее и готовимся перезагузить страницу эвента
const captureRating = () => {
  document.addEventListener('click', (e) => {
    if (
      e.target &&
      ['Add comment and/or rating', 'Edit'].includes((e.target as HTMLElement).innerText)
    ) {
      let key: string = window.location.toString().match(REGEXP_GET_ID)?.[1] || '0';
      chrome.storage.session.set({ [`reload-${key}`]: 'true' });
    }
  });
};

chrome.storage.sync
  .get(UTILS_ACTIVE_NAME)
  .then((res) => {
    if (res[UTILS_ACTIVE_NAME].refreshEvent) {
      captureRating();
    }
  })
  .catch((err) => console.log(err));
