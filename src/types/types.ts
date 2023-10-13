export interface IUtilsActive {
  event: boolean,
  unratedSpoilers: boolean,
  graphs: boolean,
  redirectOnCard: boolean,
  topsBtns: boolean,
  favEvents: boolean,
};

export type TCreateLiFn = (link: string, text: string) => HTMLLIElement;

export type TFindClosest = (list: number[], x: number) => number;

export interface IStateDisabled {
  upBtn: boolean,
  downBtn: boolean,
  resetBtn: boolean,
};

export interface IEventStorage {
  counter: number,
  counterTemp: number,
  isZoomed: boolean,
  scroll: number,
};

export interface ITVShow {
  id: string,
  regexp: string,
  name: string,
  isActive: boolean,
}
