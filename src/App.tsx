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
  Brush,
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

  console.log(csvData);
  return (
    <>
      <LineChart width={1000} height={700} data={csvData}>
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

        <Brush
          dataKey="time"
          height={30}
          stroke="#8884d8"
          startIndex={0}
          endIndex={Math.min(100, csvData.length - 1)} // Shows first 100 points by default
        />
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

      <table>
        <tr>
          <th>time</th>
          <th>latitude</th>
          <th>longitude</th>
          <th>depth</th>
        </tr>
        {csvData.map((data) => {
          return (
            <tr>
              <td>{data.time}</td>
              <td>{data.latitude}</td>
              <td>{data.longitude}</td>
              <td>{data.depth}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default App;
