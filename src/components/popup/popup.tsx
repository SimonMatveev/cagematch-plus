import { useEffect, useState, FC, ChangeEventHandler } from 'react';
import './popup.css';
import { ITVShow, IUtilsActive } from '../../types/types';
import UTILS_ACTIVE from '../../utils/utilsActive';
import TV_SHOWS from '../../utils/tvShows';
import { SHOWS_ACTIVE_NAME, UTILS_ACTIVE_NAME } from '../../utils/constants';

const App: FC = () => {
  const [utilsActive, setUtilsActive] = useState<IUtilsActive>(UTILS_ACTIVE);
  const [showsActive, setShowsActive] = useState<ITVShow[]>(TV_SHOWS);
  const [changeUtilsFromPopup, setChangeUtilsFromPopup] = useState(false);
  const [changeShowsFromPopup, setChangeShowsFromPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleActiveStateChange: ChangeEventHandler = (e) => {
    setUtilsActive(prev => {
      return { ...prev, [e.target.id]: !prev[e.target.id as keyof IUtilsActive] }
    })
    setChangeUtilsFromPopup(true);
  };

  const handleShowsStateChange: ChangeEventHandler = (e) => {
    setShowsActive(prev => {
      const i = prev.findIndex(item => item.id === e.target.id);
      prev[i].isActive = !prev[i].isActive;
      return [...prev];
    })
    setChangeShowsFromPopup(true);
  }

  useEffect(() => {
    Promise.all([chrome.storage.sync.get(UTILS_ACTIVE_NAME), chrome.storage.sync.get(SHOWS_ACTIVE_NAME)])
      .then(res => {
        setUtilsActive(res[0][UTILS_ACTIVE_NAME]);
        setShowsActive(res[1][SHOWS_ACTIVE_NAME]);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (changeUtilsFromPopup) {
      chrome.storage.sync.set({ [UTILS_ACTIVE_NAME]: utilsActive })
        .then(() => setChangeUtilsFromPopup(false))
        .catch(err => console.log(err));
    }
  }, [changeUtilsFromPopup]);

  useEffect(() => {
    if (changeShowsFromPopup) {
      chrome.storage.sync.set({ [SHOWS_ACTIVE_NAME]: showsActive })
        .then(() => setChangeShowsFromPopup(false))
        .catch(err => console.log(err));
    }
  }, [changeShowsFromPopup]);

  return (
    <section className='popup'>
      <h1 className='popup__title'>Cagematch+</h1>
      {!isLoading &&
        <>
          <div className='popup__wrapper'>
            <input className='popup__checkbox-active' type='checkbox' id='event' checked={utilsActive.event} onChange={handleActiveStateChange} />
            <label htmlFor='event' className='popup__label'>Навигация по странице эвента</label>
          </div>
          <div className='popup__wrapper'>
            <input className='popup__checkbox-active' type='checkbox' id='unratedSpoilers' checked={utilsActive.unratedSpoilers} onChange={handleActiveStateChange} />
            <label htmlFor='unratedSpoilers' className='popup__label'>Скрывать оценки за спойлерами</label>
          </div>
          <div className='popup__wrapper'>
            <input className='popup__checkbox-active' type='checkbox' id='graphs' checked={utilsActive.graphs} onChange={handleActiveStateChange} />
            <label htmlFor='graphs' className='popup__label'>Графики в профиле</label>
          </div>
          <div className='popup__wrapper'>
            <input className='popup__checkbox-active' type='checkbox' id='redirectOnCard' checked={utilsActive.redirectOnCard} onChange={handleActiveStateChange} />
            <label htmlFor='redirectOnCard' className='popup__label'>Переадресация на страницу карда</label>
          </div>
          <div className='popup__wrapper'>
            <input className='popup__checkbox-active' type='checkbox' id='topsBtns' checked={utilsActive.topsBtns} onChange={handleActiveStateChange} />
            <label htmlFor='topsBtns' className='popup__label'>Дополнительные кнопки в профиле</label>
          </div>
          <div className='popup__wrapper popup__wrapper_border'>
            <input className='popup__checkbox-active' type='checkbox' id='refreshEvent' checked={utilsActive.refreshEvent} onChange={handleActiveStateChange} />
            <label htmlFor='refreshEvent' className='popup__label'>Перезагрузка страницы жестом</label>
          </div>
          <div className='popup__wrapper'>
            <input className='popup__checkbox-active' type='checkbox' id='favEvents' checked={utilsActive.favEvents} onChange={handleActiveStateChange} />
            <label htmlFor='favEvents' className='popup__label'>Любимые ТВ-шоу</label>
          </div>
          <div className='popup__shows'>
            {showsActive.map(show => {
              return (
                <>
                  <input className='popup__checkbox-show' type='checkbox' id={show.id} checked={show.isActive} onChange={handleShowsStateChange} />
                  <label htmlFor={show.id} className='popup__show'>{show.name}</label>
                </>
              )
            })}
          </div>
        </>}
    </section>
  )
};

export default App;
