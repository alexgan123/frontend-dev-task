import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Papa from "papaparse";
import "./App.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    time: "2025-06-03T14:00:14.590Z",
    latitude: 38.76966476,
    longitude: -122.737999,
    depth: 0.980000019,
  },
  {
    time: "2025-06-03T14:00:10.863Z",
    latitude: 63.0255,
    longitude: -150.6247,
    depth: 108.9,
  },
  {
    time: "2025-06-03T13:54:48.820Z",
    latitude: 38.82249832,
    longitude: -122.8424988,
    depth: 2.269999981,
  },
];


function App() {
  const [count, setCount] = useState(0);
  const [latitude, setLatitude] = useState(true);
  const [longitude, setLongitude] = useState(true);
  const [depth, setDepth] = useState(true);

  return (
    <>
      <LineChart width={600} height={300} data={data}>

        {latitude && <Line type="monotone" dataKey="latitude" stroke="#ff9933" />}
        {longitude && <Line type="monotone" dataKey="longitude" stroke="#ff3333" />}
        {depth && <Line type="monotone" dataKey="depth" stroke="#3399ff" /> }

        <CartesianGrid stroke="#ccc" />
        <XAxis />
        <YAxis />
        <Tooltip />
      </LineChart>

      <div>Earthquake data</div>
      <label>
        <input
          type="checkbox"
          onChange={() => setLatitude(!latitude)}
          checked={latitude}
        ></input>
        Latitude
      </label>

      <label>
        <input
          type="checkbox"
          onChange={() => setLongitude(!longitude)}
          checked={longitude}
        ></input>
        Longitude
      </label>

      <label>
        <input
          type="checkbox"
          onChange={() => setDepth(!depth)}
          checked={depth}
        ></input>
        Depth
      </label>
    </>
  );
}

export default App;
