import { useEffect, useState } from "react";
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

function App() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [latitude, setLatitude] = useState(true);
  const [longitude, setLongitude] = useState(true);
  const [depth, setDepth] = useState(true);

  useEffect(() => {
    Papa.parse("/all_month.csv", {
      header: true,
      dynamicTyping: true,
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as any[];
        const transformedData = parsedData.map((row) => ({
          ...row,
          time: new Date(row.time).toISOString(), // ensure valid time formatting
        }));
        setCsvData(transformedData);
      },
      error: (error) => {
        console.error("CSV fetch error:", error);
      },
    });
  }, []);

  return (
    <>
      <LineChart width={600} height={300} data={csvData}>
        {latitude && (
          <Line type="monotone" dataKey="latitude" stroke="#ff9933" />
        )}
        {longitude && (
          <Line type="monotone" dataKey="longitude" stroke="#ff3333" />
        )}
        {depth && <Line type="monotone" dataKey="depth" stroke="#3399ff" />}

        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
      </LineChart>

      <div>Earthquake data</div>

      <label>
        <input
          type="checkbox"
          onChange={() => setLatitude(!latitude)}
          checked={latitude}
        />
        Latitude
      </label>

      <label>
        <input
          type="checkbox"
          onChange={() => setLongitude(!longitude)}
          checked={longitude}
        />
        Longitude
      </label>

      <label>
        <input
          type="checkbox"
          onChange={() => setDepth(!depth)}
          checked={depth}
        />
        Depth
      </label>
    </>
  );
}

export default App;
