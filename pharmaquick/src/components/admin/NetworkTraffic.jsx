// src/components/NetworkTraffic.js
import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

Chart.register(...registerables);

const NetworkTraffic = () => {
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);

  useEffect(() => {
    // Fetch Line Data
    fetch("https://localhost:44301/api/NetworkTraffic/line")
      .then((response) => response.json())
      .then((data) => setLineData(data));

    // Fetch Bar Data
    fetch("https://localhost:44301/api/NetworkTraffic/bar")
      .then((response) => response.json())
      .then((data) => setBarData(data));

    // Fetch Doughnut Data
    fetch("https://localhost:44301/api/NetworkTraffic/doughnut")
      .then((response) => response.json())
      .then((data) => setDoughnutData(data));
  }, []);

  // Wait for data to be loaded
  if (!lineData || !barData || !doughnutData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Network Traffic Analysis</h2>

      <div className="row">
        <div className="col-md-6">
          <h4>Visitors per Month</h4>
          <Line data={lineData} />
        </div>
        <div className="col-md-6">
          <h4>Daily Clicks</h4>
          <Bar data={barData} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 offset-md-3">
          <h4>Traffic Sources</h4>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default NetworkTraffic;
