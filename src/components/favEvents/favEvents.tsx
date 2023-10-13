import { useState, useEffect, FC } from 'react';
import './app.css';
import { ITVShow } from '../../types/types';

const App: FC = () => {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.sync.get('showsActive')
      .then(res => {
        const showsREArr: string[] = res.showsActive.filter((show: ITVShow) => show.isActive).map((show: ITVShow) => show.regexp);
        const showsRE = new RegExp(`(${showsREArr.join('|')})`);
        const arr: string[] = [...document.querySelectorAll<HTMLElement>('.TRowTVShow'), ...document.querySelectorAll<HTMLElement>('.TRowOnlineStream')].filter(item => showsRE.test(item.innerText)).map(item => item.innerHTML);
        setEvents(arr);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className='Caption'>
        <p className='favEvents__title'>Favourite events</p>
      </div>
      <div className='TBase'>
        {events.map((event, i) => (
          <div key={i} className={`TCol ${!(i % 2) ? 'TRow1' : 'TRow2'}`} dangerouslySetInnerHTML={{ __html: event }}></div>
        ))}
      </div>
    </>
  );
};

export default App;
