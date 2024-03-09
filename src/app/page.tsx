"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [statusData, setStatusData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [locData, setLocData] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    // fetch server status data
    const query = `query DeviceStatusesQuery { DeviceStatuses {
      temperature_c, 
      humidity, 
      location { 
        latitude, 
        longitude 
      }, 
      timestamp
    } }`;

    const api_url = process.env.NEXT_PUBLIC_API_URL;
    console.log(api_url);

    fetch(`${api_url}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: query }),
    })
      .then((r) => r.json())
      .then(({ data }) => {
        // map status data into chart data

        const deviceStatuses: Array<any> = data.DeviceStatuses;
        if (deviceStatuses.length === 0) {
          return;
        }

        const hum: number[] = [];
        const temp: number[] = [];
        const label: string[] = [];

        deviceStatuses.forEach(({ temperature_c, humidity, timestamp }) => {
          label.push(new Date(timestamp * 1000).toLocaleTimeString());
          temp.push(temperature_c);
          hum.push(humidity);
        });

        setLocData(deviceStatuses[0].location);
        setStatusData({
          labels: label,
          datasets: [
            {
              label: "Temperature (C)",
              data: temp,
            },
            {
              label: "Humidity",
              data: hum,
            },
          ],
        });
        setShow(true);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <h1>Dashboard</h1>
      </Row>
      <Row>
        <Col sm>
          <h3>Server Status</h3>
          {show ? <Line data={statusData}></Line> : <p>No data available</p>}
        </Col>
        <Col sm>
          <h3>Server Location</h3>
          {show ? (
            <p>
              {locData.latitude}, {locData.longitude}
            </p>
          ) : (
            <p>No data available</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
