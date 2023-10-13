import { FC, useEffect, useState } from 'react';
import './app.css';
import upBtn from '../../images/triangle-up.svg';
import downBtn from '../../images/triangle-down.svg';
import resetBtn from '../../images/reset.svg';
import zoomOut from '../../images/fullscreen-out.svg';
import zoomIn from '../../images/fullscreen-in.svg';
import scrollSvg from '../../images/scroll.svg';
import scrollSvgWhite from '../../images/scroll-white.svg';
import useDebouncedFunction from '../../hooks/useDebouncedFn';
import { IEventStorage, IStateDisabled, TFindClosest } from '../../types/types';

const App: FC = () => {
  const matches = document.querySelectorAll<HTMLElement>('.Match');
  let key: string = window.location.toString().match(/&nr=(\d+)/)?.[1] || '0';

  const [offsets, setOffsets] = useState<number[]>(getOffsets());
  const [counter, setCounter] = useState(0);
  const [counterTemp, setCounterTemp] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [isZoomed, setZoomed] = useState(true);
  const [isWheelControlEnabled, setWheelControlEnabled] = useState(true);
  const [fromStorage, setFromStorage] = useState(true);
  const [isDisabled, setDisabled] = useState<IStateDisabled>({
    upBtn: true,
    downBtn: false,
    resetBtn: false
  });

  function getOffsets(): number[] {
    let vh: number = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    let matchOffsets: number[] = [...matches].map(match => (match.offsetHeight + match.offsetTop) * 1.5 - vh + 20);
    matchOffsets.unshift(0);
    return matchOffsets;
  }

  const handleOffsets = () => setOffsets(getOffsets());

  const handleStore = () => {
    const scroll = window.scrollY;
    const storeData: IEventStorage = { counter, counterTemp, isZoomed, scroll, };
    chrome.storage.session.set({ [key]: storeData });
    chrome.storage.sync.set({ wheelcontrol: isWheelControlEnabled });
  };

  const goDown = () => setCounter(counter => ++counter);

  const goUp = () => setCounter(counter => --counter);

  const reset = () => setCounter(0);

  const handleZoom = () => {
    if (isZoomed) findClosest();
    setZoomed(zoom => !zoom);
  };

  const handleScrollWithoutDebounce = (e: WheelEvent) => {
    if (Math.sign(e.deltaY) > 0 && counter < offsets.length - 1) {
      goDown();
    } else if (Math.sign(e.deltaY) < 0 && counter > 0) {
      goUp();
    }
  };
  const handleScrollDebounced = useDebouncedFunction(handleScrollWithoutDebounce, 200);

  const handleScroll = (e: WheelEvent) => {
    if (isZoomed && isWheelControlEnabled) {
      e.preventDefault();
      handleScrollDebounced(e);
    }
  };

  const closest: TFindClosest = (list, x) => {
    let min, chosen = 0;
    for (let i in list) {
      min = Math.abs(list[chosen] - x);
      if (Math.abs(list[i] - x) < min) {
        chosen = +i;
      }
    }
    return chosen;
  };

  const findClosest = () => {
    const scroll = window.scrollY
    const i = closest(offsets, scroll);
    setCounter(i);
  };

  const handleScrollEnabling = () => {
    if (!isWheelControlEnabled && isZoomed) {
      findClosest();
    } else if (isWheelControlEnabled && isZoomed) {
      setCounter(9999);
    }
    setWheelControlEnabled(state => !state);
  };

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    //getting states from storage
    chrome.storage.session.get([key]).then(res => {
      if (res[key]) {
        setCounter(res[key].counterTemp || res[key].counter);
        setZoomed(res[key].isZoomed);
        setScroll(res[key].scroll);
      }
    });

    chrome.storage.sync.get('wheelcontrol')
      .then(res => setWheelControlEnabled(res.wheelcontrol));
    //getting new offsets on resize
    window.addEventListener('resize', handleOffsets);
    return (() => {
      window.removeEventListener('resize', handleOffsets);
    });
  }, []);

  useEffect(() => {
    if (counter !== 9999) {
      if (offsets[counter] !== undefined) {
        window.scrollTo(0, offsets[counter]);
      } else {
        window.scrollTo(0, scroll);
      }
    }

    if (counter > 0 && counter === offsets.length - 1) {
      setDisabled({ resetBtn: false, upBtn: false, downBtn: true });
    } else if (counter > 0 && counter < offsets.length - 1) {
      setDisabled({ resetBtn: false, upBtn: false, downBtn: false });
    } else if (counter === 0 && counter < offsets.length - 1) {
      setDisabled({ resetBtn: false, upBtn: true, downBtn: false });
    } else {
      setDisabled({ resetBtn: true, upBtn: true, downBtn: true });
    }
  }, [counter]);

  useEffect(() => {
    if (isZoomed) {
      document.body.classList.add('body-zoomed');
      setCounter(counterTemp !== 1000 ? counterTemp : 0);
      if (!isWheelControlEnabled) setTimeout(() => setCounter(9999), 0);
      setCounterTemp(0);
      setScroll(window.scrollY);
    } else {
      document.body.classList.remove('body-zoomed');
      setCounterTemp(counter);
      setCounter(1000);
    }
  }, [isZoomed]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('beforeunload', handleStore);
    return (() => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('beforeunload', handleStore);
    });
  }, [counter, isZoomed, isWheelControlEnabled]);

  useEffect(() => {
    if (fromStorage && !isWheelControlEnabled) {
      window.scrollTo(0, scroll);
      setFromStorage(false);
    }
  }, [scroll]);

  return (
    <div className='event-controls'>
      <button type="button"
        className={`event-controls__btn${isDisabled.upBtn ? ' event-controls__btn_disabled' : ''}`}
        disabled={isDisabled.upBtn}
        onClick={goUp}>
        <img className='event-controls__img' src={chrome.runtime.getURL(upBtn)} alt='Вверх' />
      </button>
      <button type="button"
        className={`event-controls__btn${!isZoomed ? ' event-controls__zoom_off' : ''}`}
        onClick={handleZoom}>
        <img className='event-controls__img' src={isZoomed ? chrome.runtime.getURL(zoomOut) : chrome.runtime.getURL(zoomIn)} alt='Изменить зум' />
      </button>
      <button type="button"
        className={`event-controls__btn${isDisabled.resetBtn ? ' event-controls__btn_disabled' : ''}`}
        disabled={isDisabled.resetBtn}
        onClick={reset}>
        <img className='event-controls__img' src={chrome.runtime.getURL(resetBtn)} alt='Ресет' />
      </button>
      <button type="button"
        className={`event-controls__btn${isDisabled.downBtn ? ' event-controls__btn_disabled' : ''}`}
        disabled={isDisabled.downBtn}
        onClick={goDown}>
        <img className='event-controls__img' src={chrome.runtime.getURL(downBtn)} alt='Вниз' />
      </button>
      <button type="button"
        className={`event-controls__btn${!isWheelControlEnabled ? ' event-controls__btn_inactive' : ''}`}
        onClick={handleScrollEnabling}>
        <img className='event-controls__img' src={!isWheelControlEnabled ? chrome.runtime.getURL(scrollSvgWhite) : chrome.runtime.getURL(scrollSvg)} alt='Режим управления колесом мыши' />
      </button>
    </div>
  )
};

export default App;

