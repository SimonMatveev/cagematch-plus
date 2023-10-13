import { ITVShow } from "../types/types";

const TV_SHOWS: ITVShow[] = [
  {
    id: 'raw',
    name: 'WWE RAW',
    regexp: 'Monday Night RAW',
    isActive: true,
  }, {
    id: 'smackdown',
    name: 'WWE SmackDown',
    regexp: 'Friday Night SmackDown',
    isActive: true,
  }, {
    id: 'dynamite',
    name: 'AEW Dynamite',
    regexp: 'AEW Dynamite',
    isActive: true,
  }, {
    id: 'rampage',
    name: 'AEW Rampage',
    regexp: 'AEW Rampage',
    isActive: true,
  }, {
    id: 'NXT',
    name: 'WWE NXT',
    regexp: 'WWE NXT #.+',
    isActive: true,
  }, {
    id: 'impact',
    name: 'Impact Wrestling',
    regexp: 'Impact Wrestling #.+',
    isActive: true,
  }, {
    id: 'roh',
    name: 'Ring Of Honor',
    regexp: 'ROH on HonorClub',
    isActive: true,
  },

];

export default TV_SHOWS;
