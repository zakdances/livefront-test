import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router";
import { addItem } from './view model/slices/mainList';

import './App.css';
import MainList from './views/mainList';
import MainCanvas from './views/mainCanvas';
import Detail from './views/Detail';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetching data from API
    console.log('Component mounted');
    const fetchData = async () => {
      const url = 'https://api.poly.pizza/v1.1/search/architecture';
      try {
        console.log('Fetching data from:', url);
        const response = await fetch(url,
          {
            headers: {
              'X-Auth-Token': import.meta.env.VITE_API_KEY,
              'Content-Type': 'application/json' // Optional: Specify the content type
            }
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log('Data fetched:', json);

        for (const item of json.rows) {
          dispatch(addItem(item));
        }

        // setData(json);
      } catch (e) {
        // setError(e);
        console.error('Error fetching data:', e);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();

    // The empty dependency array ensures this effect runs only once, similar to componentDidMount
  }, []);

  return (
    <div>
      <div>
        <span style={{ fontSize: 100 }}>🗿</span>
      </div>
      <h1 className='metamorphous-regular'>Smithsonian Artifacts</h1>

      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <Routes>
          <Route path="/" element={<MainList />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <MainCanvas />
    </div>
  )
}

export default App
