import { useEffect, useState } from 'react';
import "./graphs.css";
import GraphContent from './GraphContent';
import { CLASS_GRAPH_BUTTON, CLASS_ROW_BTN_DEFAULT } from '../../utils/classes';

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
      }).filter(notEmpty);
      setDataset(rowData);
      setTitle(row[0].innerText);
    }
  };

  useEffect(() => {
    handleDefaultGraph();

    rows.forEach(row => {
      const rowBtn = row.children[1];
      rowBtn?.addEventListener('click', handleGraph);
      rowBtn?.classList.add(CLASS_GRAPH_BUTTON);
    });

    const rowBtnDefault = document.querySelector(CLASS_ROW_BTN_DEFAULT);
    rowBtnDefault?.addEventListener('click', handleDefaultGraph);
    rowBtnDefault?.classList.add(CLASS_GRAPH_BUTTON);

    return () => {
      rows.forEach(row => {
        const rowBtn = row.children[1];
        rowBtn?.removeEventListener('click', handleGraph);
        rowBtn?.classList.remove(CLASS_GRAPH_BUTTON);
      });
      rowBtnDefault?.removeEventListener('click', handleDefaultGraph);
      rowBtnDefault?.classList.remove(CLASS_GRAPH_BUTTON);
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

