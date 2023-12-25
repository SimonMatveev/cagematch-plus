import { TCreateLiFn, TFindClosest } from '../types/types';
import { CLASS_LIST_ITEM } from './classes';


export const closest: TFindClosest = (list, x) => {
  let min, chosen = 0;
  for (let i in list) {
    min = Math.abs(list[chosen] - x);
    if (Math.abs(list[i] - x) < min) {
      chosen = +i;
    }
  }
  return chosen;
};

export const createListItem: TCreateLiFn = (link, text) => {
  const li = document.createElement('li');
  li.classList.add(CLASS_LIST_ITEM);
  const a = document.createElement('a');
  a.href = link;
  a.textContent = text;
  li.append(a);
  return li;
};