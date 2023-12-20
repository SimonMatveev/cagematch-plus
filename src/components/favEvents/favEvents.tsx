import { useState, useEffect, FC } from 'react';
import './favEvents.css';
import { ITVShow } from '../../types/types';
import { CLASS_ONLINE_STREAM, CLASS_TV_SHOW, CLASS_TROW, } from '../../utils/classes';

const App: FC = () => {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.sync.get('showsActive')
      .then(res => {
        const showsREArr: string[] = res.showsActive.filter((show: ITVShow) => show.isActive).map((show: ITVShow) => show.regexp);
        const showsRE = new RegExp(`(${showsREArr.join('|')})`);
        const arr: string[] = [...document.querySelectorAll<HTMLElement>(CLASS_TV_SHOW), ...document.querySelectorAll<HTMLElement>(CLASS_ONLINE_STREAM)].filter(item => showsRE.test(item.innerText)).map(item => item.innerHTML);
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
          <div key={i} className={`TCol ${!(i % 2) ? CLASS_TROW[0] : CLASS_TROW[1]}`} dangerouslySetInnerHTML={{ __html: event }}></div>
        ))}
      </div>
    </>
  );
};

export default App;
