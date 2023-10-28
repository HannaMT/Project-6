import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Detail from './component/Detail';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label} from 'recharts';
import './App.css';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [info, setInfo] = useState(null);
  const [filter, setFilter] = useState('');
  const [sliderValue, setSliderValue] = useState(0.8);

  useEffect(() => {
    const fetchCityForecast = async () => {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=NewYork&key=${ACCESS_KEY}`
      );
      const jsonData = await response.json();
      setInfo(jsonData);
    };
    fetchCityForecast().catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <div className="body">
        <div className="Side-Bar">
          <div id="Header">
            <h2>
              Meteorology
            </h2>
          </div>
          <div id="NavBar">
            <p>Dashboard</p>
            <p>Search</p>
            <p>About</p>
          </div>
        </div>

        <div id="main">
          <div id="Card">
            <div id="card1">
              <h2>{info ? info.city_name : ''}</h2>
              <h2>{info ? info.country_code : ''}</h2>
            </div>
            <div id="card2">
              <h2>{sliderValue * 20}</h2>
              <h2>Days</h2>
            </div>
            <div id="card3">
              <h2>{info && info.data.length > 0 ? info.data[0].datetime : ''}</h2>
              <h2>Today</h2>
            </div>
          </div>

          <div className = "data">
          <div id="List">
            <div id="top">
              <div id="top1">
                <input type="text" placeholder="Enter Date" onChange={(e) => setFilter(e.target.value)} />
              </div>
              <div id="top2">
                <p>List Length</p> <input type="range" min="0.0" max="0.8" step="0.1" value={sliderValue} onChange={(e) => setSliderValue(parseFloat(e.target.value))} />
              </div>
              <div id="top3">
                <button>Search</button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Date</th>
                  <th>Max Temperature</th>
                  <th>Min Temperature</th>
                  <th>Average Temperature</th>
                </tr>
              </thead>
              <tbody>
                {info && info.data ? info.data
                  .filter((collection, i) => collection.datetime.includes(filter) && i <= sliderValue * 20)
                  .map((collection, i) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/detail/${i}`}>View Details</Link>
                      </td>
                      <td>{collection.datetime}</td>
                      <td>{collection.max_temp}</td>
                      <td>{collection.min_temp}</td>
                      <td>{Math.floor((collection.max_temp + collection.min_temp) / 2)}</td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </table>
          </div>
          <div className="charts">
          {info && info.data && (
            <div className="maxChart">
              <h2>Maximum Temperature</h2>
              <LineChart
                width={500}
                height={300}
                data={info.data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <Line type="monotone" dataKey="max_temp" stroke="#8884d8" activeDot={{ r: 8 }} />
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="datetime" interval={2} angle={20} dx={20}>
                  <Label value="Date and Time" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis
                  label={{
                    value: "Temperature (°C)",
                    angle: -90,
                    position: "insideLeft",
                    textAnchor: "middle",
                  }}
                />
                <Tooltip />
              </LineChart>
            </div>
          )}
          {info && info.data && (
            <div className="minChart">
              <h2>Minimum Temperature</h2>
              <LineChart
                width={500}
                height={300}
                data={info.data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <Line type="monotone" dataKey="min_temp" stroke="#82ca9d" activeDot={{ r: 8 }} />
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="datetime" interval={2} angle={20} dx={20}>
                  <Label value="Date and Time" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis
                  label={{
                    value: "Temperature (°C)",
                    angle: -90,
                    position: "insideLeft",
                    textAnchor: "middle",
                  }}
                />
                <Tooltip />
              </LineChart>
            </div>
          )}
        </div>
        </div>
        </div>
      </div>
      <Routes>
        <Route path="/detail/:i" element={info ? <Detail req={info.data} /> : null} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;