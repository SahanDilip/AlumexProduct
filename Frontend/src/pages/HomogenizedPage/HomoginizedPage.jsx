import React, { useState,useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Bar } from "react-chartjs-2"; // Import Bar from react-chartjs-2
import { alloys } from "../../assets/assset";
import { Chart as ChartJS } from "chart.js/auto";

export default function HomoginizedPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [chartData, setChartData] = useState(null); // State to store chart data
  const [data,setData]=useState()

  const getData = async () => {
    try {
      const res = await fetch('https://sheet.best/api/sheets/6bb07780-a849-44ef-9ece-5244cf54b9bb');
      const incomingdata = await res.json();
      setData(incomingdata);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(()=> {
    getData();
  },[])

  

  const getBarGraph = () => {
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          label: "Revenue",
          data: [200, 300, 400],
        },
        {
          label: "Loss",
          data: [20, 30, 40],
        },
      ],
    };

    setChartData(data); // Set the chart data to be rendered
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        <Dropdown
          value={selectedType}
          onChange={(e) => setSelectedType(e.value)}
          options={alloys}
          optionLabel="name"
          editable
          placeholder="Select a Type"
          className="drop down val"
        />
      </div>
      <button onClick={getBarGraph}>BTA</button>
      {/* <button onClick={getGraph}>Green Size</button>
       <button onClick={getGraph}>Inverse Segregation</button> */}

      {chartData && (
        <Bar
          data={chartData}
          options={{ responsive: true }}
        />
      )}
      <div className="dataCard revenue">
      </div>
    </div>
  );
}
