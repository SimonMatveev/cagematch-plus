import { TFindClosest } from '../types/types';


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