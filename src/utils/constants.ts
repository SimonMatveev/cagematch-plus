import { ITopBtns } from '../types/types';

export const KEYS_TO_BLOCK = ['Space', 'ArrowDown', 'ArrowUp'];
export const BACKGROUND_COLOR = '#750404';
export const BORDER_COLOR = 'black';
export const UTILS_ACTIVE_NAME = 'utilsActive';
export const SHOWS_ACTIVE_NAME = 'showsActive';
export const TOP_BTNS: ITopBtns = {
    BEST_MATCHES: {
        URL: '?id=111&view=list&sortby=colRating&sorttype=DESC',
        NAME: 'Best Matches',
    },
    EVENTS: {
        URL: '?sortby=colDate&sorttype=ASC&id=1&view=search&sEventName=&sPromotion=1&sDateFromDay=01&sDateFromMonth=01&sDateFromYear=2001&sDateTillDay=31&sDateTillMonth=12&sDateTillYear=2023&sRegion=&sEventType=Pay+Per+View&sLocation=&sArena=&sAny=',
        NAME: 'Events (2001-now)',
    }
}