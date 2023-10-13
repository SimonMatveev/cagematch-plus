const redirectOnCard = () => {
  const links = document.querySelectorAll<HTMLLinkElement>('a');
  [...links].forEach(link => {
    if (/id=1&/g.test(link.href) && !/&page=3/g.test(link.href) && !link.closest('li')?.classList.contains('ContentNavigatorItem')) {
      link.href += '&page=3';
    }
  });
};

chrome.storage.sync.get('utilsActive')
  .then(res => {
    if (res.utilsActive.redirectOnCard) {
      redirectOnCard();
    }
  })
  .catch(err => console.log(err));
