import './unratedSpoilers.css';

const showNotRated: EventListener = (e) => {
  e.preventDefault();
  const target = e.target as Element;
  target.classList.remove('rating_hidden');
  target.closest('a')?.classList.remove('rating-link_hidden');
  target.closest('.MatchRecommendedLine')?.querySelector('.MatchRecommendedWON')?.classList.remove('rating_hidden');
  target.removeEventListener('click', showNotRated);
};

const hideNotRated = () => {
  [...document.querySelectorAll('.MatchRecommendedCandidate')].forEach(item => {
    const ratingLine = item.closest('.MatchRecommendedLine');
    const rating = ratingLine?.querySelector('span');
    const WON = ratingLine?.querySelector('.MatchRecommendedWON');

    rating?.classList.add('rating_hidden');
    WON?.classList.add('rating_hidden');
    rating?.closest('a')?.classList.add('rating-link_hidden');

    rating?.addEventListener('click', showNotRated);
  })
};

chrome.storage.sync.get('utilsActive')
  .then(res => {
    if (res.utilsActive.unratedSpoilers) {
      hideNotRated();
    }
  })
  .catch(err => console.log(err));
