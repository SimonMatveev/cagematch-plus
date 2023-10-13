import { TCreateLiFn } from "../../types/types";

const createListItem: TCreateLiFn = (link, text) => {
  const li = document.createElement('li');
  li.classList.add('ContentNavigatorItem');
  const a = document.createElement('a');
  a.href = link;
  a.textContent = text;
  li.append(a);
  return li;
};

const createBtns = () => {
  const menu = document.querySelector<HTMLUListElement>('.ContentNavigator');

  if (menu) {
    menu.append(createListItem('?id=111&view=list&sortby=colRating&sorttype=DESC', 'Best Matches'));
    menu.append(createListItem('?sortby=colDate&sorttype=ASC&id=1&view=search&sEventName=&sPromotion=1&sDateFromDay=01&sDateFromMonth=01&sDateFromYear=2001&sDateTillDay=31&sDateTillMonth=12&sDateTillYear=2023&sRegion=&sEventType=Pay+Per+View&sLocation=&sArena=&sAny=', 'Events (2001-now)'));
  }
};

chrome.storage.sync.get('utilsActive')
  .then((res) => {
    if (res.utilsActive.topsBtns) {
      createBtns();
    }
  })
  .catch(err => console.log(err));
