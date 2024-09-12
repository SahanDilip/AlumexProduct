import React from "react";
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

// Register the required components with Chart.js
ChartJS.register(
  CategoryScale, // Category scale for x-axis
  LinearScale, // Linear scale for y-axis
  PointElement, // Points on the line chart
  LineElement, // Line element for the line chart
  Title, // Title component
  Tooltip, // Tooltip component
  Legend // Legend component
);

import { useLocation } from "react-router-dom";
import { dataforbta } from "../../assets/asset";

export default function Graph() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedType = params.get("type");
  const selectedGraph = params.get("graph");
  console.log(selectedGraph);
  console.log(selectedType);

  return (
    <div>
      Graph
      {dataforbta && <Line data={dataforbta} options={{ responsive: true }} />}
    </div>
  );
}