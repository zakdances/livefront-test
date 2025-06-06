import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { Routes, Route } from "react-router";
import { useLocation, Routes, Route } from 'react-router-dom';
import { addItem } from './view model/slices/mainList';

import './App.css';
import MainList from './views/mainList';
import MainCanvas from './views/mainCanvas';
import Detail from './views/Detail';

function App() {
  const dispatch = useDispatch();

  const location = useLocation();
  const showComponent = location.pathname == '/';

  useEffect(() => {
    // fetching data from API
    console.log('Component mounted');
    const fetchData = async () => {
      const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + import.meta.env.VITE_API_KEY;
      try {
        console.log('Fetching data from:', url);
        const response = await fetch(url,
          // {
          //   headers: {
          //     'X-Auth-Token': import.meta.env.VITE_API_KEY,
          //     'Content-Type': 'application/json' // Optional: Specify the content type
          //   }
          // }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log('Data fetched:', json);

        for (const item of json.results) {
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

  }, []);

  return (
    <div>
      <div className='mainContent'>
        <div>
          <span style={{ fontSize: 100 }}>🗿</span>
        </div>

        <div >
          <h1 className='metamorphous-regular'>The News In Depth</h1>
          <h3 className='metamorphous-regular' style={{display: showComponent ? "block" : "none"}}>Click on a headline to see more depth</h3>
        </div>

        <div className="card">
          {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
          <Routes>
            <Route path="/" element={<MainList />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
          {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
        </div>
        {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <div style={{flexGrow: 100}}></div>
      
      </div>
      <MainCanvas />
    </div>
  )
}

export default App
