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
import axios from "axios";

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
  const selectedDate = params.get("date");
  const sheetName = params.get("sheet");

  const [chartDataBta, setChartDataBta] = useState(null);
  const [chartDataGrainSize, setChartDataGrainSize] = useState(null);
  const [chartDataIzone, setChartDataIzone] = useState(null);
  const [chartDataDendrite, setChartDataDendrite] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/sheet", {
        params: {
          date: selectedDate.trim(),
          size: selectedSize.trim(),
          grade: selectedType.trim(),
          sheet: sheetName.trim(),
        },
      });

      if (response.status === 200) {
        const fetchedData = response.data;
        console.log(fetchedData);

        const labels = fetchedData.map((item) => item.Melt_No);
        const dataBta = fetchedData.map((item) => item.BTA);
        const dataGrainSize = fetchedData.map((item) => item.Grain_Size);
        const dataIzone = fetchedData.map(
          (item) => item.Inverse_Segregasion_Zone
        );
        console.log(dataIzone);
        const dataDendrite = fetchedData.map(
          (item) => item.Dendrite_Arm_Spacing
        );

        // Set chart data for each individual graph
        if (sheetName === "Homogenize") {
          setChartDataBta({
            labels,
            datasets: [
              {
                label: `BTA for ${selectedType}`,
                data: dataBta,
                borderColor: "blue",
                fill: false,
              },
            ],
          });

          setChartDataGrainSize({
            labels,
            datasets: [
              {
                label: `Grain Size for ${selectedType}`,
                data: dataGrainSize,
                borderColor: "green",
                fill: false,
              },
            ],
          });

          setChartDataIzone({
            labels,
            datasets: [
              {
                label: `Inverse Segregation Zone for ${selectedType}`,
                data: dataIzone,
                borderColor: "red",
                fill: false,
              },
            ],
          });
        } else if (sheetName === "Cast") {
          setChartDataDendrite({
            labels,
            datasets: [
              {
                label: `Dendrite Arm Spacing for ${selectedType}`,
                data: dataDendrite,
                borderColor: "yellow",
                fill: false,
              },
            ],
          });
        }

        console.log("Data fetched and formatted successfully");
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Triggering the fetch call (inside useEffect, button click, etc.)
  useEffect(() => {
    fetchData();
  }, [selectedSize, selectedDate, selectedType, sheetName]);

  return (
    <div>
      {sheetName === "Homogenize" && (
        <>
          <h2>BTA Graph</h2>
          {chartDataBta ? (
            <Line data={chartDataBta} options={{ responsive: true }} />
          ) : (
            <p>Loading BTA Data...</p>
          )}

          <h2>Grain Size Graph</h2>
          {chartDataGrainSize ? (
            <Line data={chartDataGrainSize} options={{ responsive: true }} />
          ) : (
            <p>Loading Grain Size Data...</p>
          )}

          <h2>Inverse Segregation Zone Graph</h2>
          {chartDataIzone ? (
            <Line data={chartDataIzone} options={{ responsive: true }} />
          ) : (
            <p>Loading Inverse Segregation Zone Data...</p>
          )}
        </>
      )}

      {sheetName === "Cast" && (
        <>
          <h2>Dendrite Arm Spacing Graph</h2>
          {chartDataDendrite ? (
            <Line data={chartDataDendrite} options={{ responsive: true }} />
          ) : (
            <p>Loading Dendrite Arm Spacing Data...</p>
          )}
        </>
      )}
    </div>
  );
}
