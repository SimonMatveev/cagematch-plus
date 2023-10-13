import { useEffect, useState } from 'react';
import "./app.css";
import GraphContent from './GraphContent';

const App = () => {
  const rows = [...document.querySelectorAll<HTMLTableRowElement>('.TRow')];
  const [dataset, setDataset] = useState<number[]>([]);
  const [title, setTitle] = useState<string>('All ratings');

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null;
  }

  const handleDefaultGraph = () => {
    const numData: number[] = [];
    for (let i = 0; i <= 10; i++) {
      const colData: number[] = [];
      rows.forEach(row => {
        const td = row.children[3 + i] as HTMLTableCellElement;
        colData.push(+td.innerText);
      })
      numData.push(colData.reduce((a, i) => a + i))
    }
    setDataset(numData);
    setTitle('All ratings');
  };

  const handleGraph: EventListener = (e) => {
    const target = e.target as HTMLElement;
    const row = target.parentNode?.querySelectorAll<HTMLTableCellElement>('.TCol');
    if (row) {
      const rowData = [...row].map((item, index) => {
        if (index >= 3 && index <= 13) return +item.innerText;
        return null;
      }).filter(notEmpty<number>);
      setDataset(rowData);
      setTitle(row[0].innerText);
    }
  };

  useEffect(() => {
    handleDefaultGraph();

    rows.forEach(row => {
      const rowBtn = row.children[1];
      rowBtn?.addEventListener('click', handleGraph);
      rowBtn?.classList.add('graph__btn');
    });

    const rowBtnDefault = document.querySelector('.InformationBoxContents');
    rowBtnDefault?.addEventListener('click', handleDefaultGraph);
    rowBtnDefault?.classList.add('graph__btn');

    return () => {
      rows.forEach(row => {
        const rowBtn = row.children[1];
        rowBtn?.removeEventListener('click', handleGraph);
        rowBtn?.classList.remove('graph__btn');
      });
      rowBtnDefault?.removeEventListener('click', handleDefaultGraph);
      rowBtnDefault?.classList.remove('graph__btn');
    }
  }, []);

  return (
    <div className='graph'>
      <p className='graph__title'>{title}</p>
      <div className='graph__container'>
        <GraphContent dataset={dataset} />
      </div>
    </div>
  );
}

export default App;

