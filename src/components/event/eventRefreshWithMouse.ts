import { UTILS_ACTIVE_NAME } from '../../utils/constants';

const move: { [key: string]: number[] } = {
  top: [],
  right: [],
  down: [],
  left: [],
};

//TODO rewrite to spin from from any point of circle
const refreshWithMouse = (e: MouseEvent) => {
  if (e.buttons === 2) {
    if (move.top.length === 0) {
      move.top[0] = e.clientX;
      move.top[1] = e.clientY;
    } else if (
      move.top.length !== 0 &&
      move.right.length === 0 &&
      e.clientX > move.top[0] &&
      e.clientY > move.top[1]
    ) {
      move.right[0] = e.clientX;
      move.right[1] = e.clientY;
    } else if (
      move.right.length !== 0 &&
      move.down.length === 0 &&
      e.clientX > move.right[0] &&
      e.clientY > move.right[1]
    ) {
      move.down[0] = e.clientX;
      move.down[1] = e.clientY;
    } else if (
      move.down.length !== 0 &&
      move.left.length === 0 &&
      e.clientX < move.down[0] &&
      e.clientY < move.down[1]
    ) {
      move.left[0] = e.clientX;
      move.left[1] = e.clientY;
    } else if (move.left.length !== 0) {
      location.reload();
      window.removeEventListener('mousemove', refreshWithMouse);
      window.removeEventListener('mousedown', resetMove);
    }
  }
};
const resetMove = () => {
  move.top = [];
  move.right = [];
  move.down = [];
  move.left = [];
};

chrome.storage.sync
  .get(UTILS_ACTIVE_NAME)
  .then((res) => {
    if (res[UTILS_ACTIVE_NAME].refreshWithMouse) {
      window.addEventListener('mousemove', refreshWithMouse);
      window.addEventListener('mousedown', resetMove);
    } else {
      window.removeEventListener('mousemove', refreshWithMouse);
      window.removeEventListener('mousedown', resetMove);
    }
  })
  .catch((err) => console.log(err));
