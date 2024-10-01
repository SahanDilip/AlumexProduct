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
import annotationPlugin from 'chartjs-plugin-annotation';
import axios from "axios";

// Register the required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin // Register the annotation plugin
);

import { useLocation } from "react-router-dom";

export default function Graph() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedType = params.get("type");
  const selectedSize = params.get("size");
  const startDate = params.get("startdate");
  const endDate = params.get("enddate");
  const sheetName = params.get("sheet");

  const [chartDataBta, setChartDataBta] = useState(null);
  const [chartDataGrainSize, setChartDataGrainSize] = useState(null);
  const [chartDataIzone, setChartDataIzone] = useState(null);
  const [chartDataDendrite, setChartDataDendrite] = useState(null);


  // const [btamax, setbtamax] = useState(85);
  // const [btamin, setbtamin] = useState(85);
  // const [grainmax, setgrainmax] = useState(120);
  // const [grainmin, setgrainmin] = useState(80);
  // const [izoneMax, setizoneMax] = useState(600);
  // const [izoneMin, setizoneMin] = useState(400);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/sheet", {
        params: {
          size: selectedSize.trim(),
          grade: selectedType.trim(),
          sheet: sheetName.trim(),
        },
      });

      if (response.status === 200) {
        const fetchedData = response.data;
        console.log("fetched data", fetchedData);
    
        const filteredData = fetchedData.filter((item) => {
            const itemDate = new Date(item.Date);
            const start = new Date(startDate);
            const end = new Date(endDate);
    
            // Normalize the time part to 00:00:00 for comparison
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999); // Set to end of the day
            itemDate.setHours(0, 0, 0, 0);
    
            return itemDate >= start && itemDate <= end;
        });
        
        const labels = filteredData.map((item) => item.Melt_No);
        const dataBta = filteredData.map((item) => item.BTA);
        const dataGrainSize = filteredData.map((item) => item.Grain_Size);
        const dataIzone = filteredData.map(
          (item) => item.Inverse_Segregasion_Zone
        );
        const dataDendrite = filteredData.map(
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
            options: {
              responsive: true,
              plugins: {
                annotation: {
                  annotations: {
                    line1: {
                      type: 'line',
                      yMin: 85,
                      yMax: 85,
                      borderColor: 'red',
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        display: true,
                        content: '85%_Min BTA Level',
                        position: 'start',
                      },
                    },
                    line2: {
                      type: 'line',
                      yMin: 90,
                      yMax: 90,
                      borderColor: 'red',
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        display: true,
                        content: '90%_Optimum BTA Level',
                        position: 'start',
                      },
                    },
                  },
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: 'BTA Percentage(%)', // Replace with your desired title
                  },
                },
              },
            }
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
            options: {
              responsive: true,
              plugins: {
                annotation: {
                  annotations: {
                    line1: {
                      type: 'line',
                      yMin: 80,
                      yMax: 80,
                      borderColor: 'red',
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        display: true,
                        content: '80µm_Lower Limit',
                        position: 'start',
                      },
                    },
                    line2: {
                      type: 'line',
                      yMin: 120,
                      yMax: 120,
                      borderColor: 'red',
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        display: true,
                        content: '120µm_Upper Limit',
                        position: 'start',
                      },
                    },
                  },
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: 'Grain Size Value(µm)', // Replace with your desired title
                  },
                },
              },
            }
          });

          setChartDataIzone({
            labels,
            datasets: [
              {
                label: `Inverse Segregation Zone for ${selectedType}`,
                data: dataIzone,
                borderColor: "#008080",
                fill: false,
              },
            ],
            options: {
              responsive: true,
              plugins: {
                annotation: {
                  annotations: {
                    line1: {
                      type: 'line',
                      yMin: 400,
                      yMax: 400,
                      borderColor: 'red',
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        display: true,
                        content: '400µm_Upper Limit',
                        position: 'start',
                      },
                    },
                    line2: {
                      type: 'line',
                      yMin: 600,
                      yMax: 600,
                      borderColor: 'red',
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        display: true,
                        content: '600µm_Upper Limit',
                        position: 'start',
                      },
                    },
                  },
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: 'Inverse Segregarian Value(µm)', // Replace with your desired title
                  },
                },
              },
            }
          });
        } else if (sheetName === "Cast") {
          setChartDataDendrite({
            labels,
            datasets: [
              {
                label: `Dendrite Arm Spacing for ${selectedType}`,
                data: dataDendrite,
                borderColor: "red",
                fill: false,
              },
            ],
            options: {
              responsive: true,
            }
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

  useEffect(() => {
    fetchData();
  }, [selectedSize, startDate,endDate, selectedType, sheetName]);

  return (
    <div className="flex flex-wrap">
      {sheetName === "Homogenize" && (
        <>
          <div className="w-2/4 h-2/4">
            <h1>BTA Graph</h1>
            {chartDataBta ? (
              <Line data={chartDataBta} options={chartDataBta.options} />
            ) : (
              <p>Loading BTA Data...</p>
            )}
          </div>

          <div className="w-2/4 h-2/4">
            <h1>Grain Size Graph</h1>
            {chartDataGrainSize ? (
              <Line
                data={chartDataGrainSize}
                options={chartDataGrainSize.options}
              />
            ) : (
              <p>Loading Grain Size Data...</p>
            )}
          </div>

          <div className="w-2/4 h-2/4">
            <h1>Inverse Segregation Zone Graph</h1>
            {chartDataIzone ? (
              <Line
                data={chartDataIzone}
                options={chartDataIzone.options}
              />
            ) : (
              <p>Loading Inverse Segregation Zone Data...</p>
            )}
          </div>
        </>
      )}

      {sheetName === "Cast" && (
        <>
          <div className="w-2/4 h-2/4">
            <h1>Dendrite Arm Spacing Graph</h1>
            {chartDataDendrite ? (
              <Line
                data={chartDataDendrite}
                options={chartDataDendrite.options}
              />
            ) : (
              <p>Loading Dendrite Arm Spacing Data...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
