import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from 'axios';

// Register the required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { useLocation } from "react-router-dom";

export default function Graph() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedType = params.get("type");
  const selectedSize = params.get("size");

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/sheet", {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            selectedType: selectedType,
            selectedSize: selectedSize,
          },
        });

        if (response.status === 200) {
          console.log("Get Data Successfully");
          console.log(response);
          // setChartData(response.data); // Update with actual data
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedType, selectedSize]);

  return (
    <div>
      Graph
      {chartData ? (
        <Line data={chartData} options={{ responsive: true }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
