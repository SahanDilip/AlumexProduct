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
import annotationPlugin from "chartjs-plugin-annotation";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

export default function Graph2() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedType = params.get("type");
  const selectedSize = params.get("size");
  const startDate = params.get("startdate");
  const endDate = params.get("enddate");
  const sheetName = params.get("sheet");

  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("sheet/getMeltingData", {
        params: {
          size: selectedSize.trim(),
          grade: selectedType.trim(),
          sheet: sheetName.trim(),
        },
      });

      if (response.status === 200) {
        const fetchedData = response.data;

        const filteredData = fetchedData.filter((item) => {
          const itemDate = new Date(item.Date);
          const start = new Date(startDate);
          const end = new Date(endDate);

          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
          itemDate.setHours(0, 0, 0, 0);

          return itemDate >= start && itemDate <= end;
        });

        const labels = filteredData.map((item) => item['Melt No']);

        const dataKeys = ['Si %', 'Fe %', 'Mg %', 'Mn %', 'Cu %', 'Cr %', 'TiB2', 'Excess Si', 'Mg/Si'];
        const colors = ["#FF5733", "#C70039", "#FFC300", "#DAF7A6", "#581845", "#900C3F", "#FF5733", "#FFC300", "#C70039"];

        const newChartData = dataKeys.reduce((acc, key, index) => {
          acc[key] = {
            labels,
            datasets: [{
              label: `${key} for ${selectedType}`,
              data: filteredData.map((item) => parseFloat(item[key]) || 0), // Added a fallback to 0
              borderColor: colors[index],
              fill: false,
            }]
          };
          return acc;
        }, {});

        setChartData(newChartData);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType, selectedSize, startDate, endDate, sheetName]);

  return (
    <div className="flex flex-wrap">
      {Object.entries(chartData).map(([key, data]) => (
        <div key={key} className="w-2/4">
          <h1>{key} Graph</h1>
          {data && data.datasets && data.datasets.length > 0 ? (
            <Line 
              data={data} 
              options={{
                responsive: true, 
                scales: { 
                  x: { 
                    title: { display: true, text: 'Melt No' } 
                  }, 
                  y: { 
                    title: { display: true, text: key } 
                  } 
                } 
              }} 
            />
          ) : (
            <p>Loading {key} Data...</p>
          )}
        </div>
      ))}
    </div>
  );
}
