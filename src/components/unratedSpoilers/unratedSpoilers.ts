import { CLASS_MATCH_RECOMENDED_LINE, CLASS_MATCH_RECOMENDED_WON, CLASS_MATCH_RECOMENDEND_CANDIDATE } from '../../utils/classes';
import { UTILS_ACTIVE_NAME } from '../../utils/constants';
import './unratedSpoilers.css';

const showNotRated: EventListener = (e) => {
  e.preventDefault();
  const target = e.target as Element;
  target.classList.remove('rating_hidden');
  target.closest('a')?.classList.remove('rating-link_hidden');
  target.closest(CLASS_MATCH_RECOMENDED_LINE)?.querySelector(CLASS_MATCH_RECOMENDED_WON)?.classList.remove('rating_hidden');
  target.removeEventListener('click', showNotRated);
};

const hideNotRated = () => {
  [...document.querySelectorAll(CLASS_MATCH_RECOMENDEND_CANDIDATE)].forEach(item => {
    const ratingLine = item.closest(CLASS_MATCH_RECOMENDED_LINE);
    const rating = ratingLine?.querySelector('span');
    const WON = ratingLine?.querySelector(CLASS_MATCH_RECOMENDED_WON);

    rating?.classList.add('rating_hidden');
    WON?.classList.add('rating_hidden');
    rating?.closest('a')?.classList.add('rating-link_hidden');

    rating?.addEventListener('click', showNotRated);
  })
};

chrome.storage.sync.get(UTILS_ACTIVE_NAME)
  .then(res => {
    if (res[UTILS_ACTIVE_NAME].unratedSpoilers) {
      hideNotRated();
    }
  })
  .catch(err => console.log(err));
