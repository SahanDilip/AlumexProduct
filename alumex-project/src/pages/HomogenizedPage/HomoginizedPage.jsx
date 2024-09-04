import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { alloys, graphs } from "../../assets/asset";
import { useNavigate } from "react-router-dom";

export default function HomoginizedPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const navigate = useNavigate();

  // Convert the graphs object into an array of options
  const graphOptions = Object.keys(graphs).map(key => ({
    label: key,
    value: graphs[key]
  }));

  const getBtaGraph = () => {
    console.log(selectedType);
    console.log(selectedGraph);
    // Perform further actions, e.g., navigate to a different page
    // setChartData(dataforbta);
    navigate(`/graph?type=${encodeURIComponent(selectedType)}&graph=${encodeURIComponent(selectedGraph)}`);
  };

  return (
    <div>
      <div className="container">
        <Dropdown
          value={selectedType}
          onChange={(e) => setSelectedType(e.value)}
          options={alloys}
          optionLabel="name"
          editable
          placeholder="Select a Type"
          className="dropdown val"
        />
      </div>
      <div className="container">
        <Dropdown
          value={selectedGraph}
          onChange={(e) => setSelectedGraph(e.value)}
          options={graphOptions}
          optionLabel="label" // This is the name of the option (e.g., "BTA", "GRAIN_SIZE")
          editable
          placeholder="Select a Graph"
          className="dropdown val"
        />
      </div>
      <button onClick={getBtaGraph}>Show Graph</button>
    </div>
  );
}
