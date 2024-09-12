import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { alloys, graphs } from "../../assets/asset";
import { useNavigate } from "react-router-dom";

export default function HomoginizedPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setselectedSize] = useState(null);
  const navigate = useNavigate();

  // Convert the graphs object into an array of options
  const graphOptions = Object.keys(graphs).map((key) => ({
    label: key,
    value: graphs[key],
  }));

  const getBtaGraph = () => {
    // console.log(selectedType);
    // console.log(selectedSize);
    
    navigate(
      `/graph?type=${encodeURIComponent(
        selectedType
      )}&size=${encodeURIComponent(selectedSize)}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full mb-4 md:w-1/3">
        <Dropdown
          value={selectedType}
          onChange={(e) => setSelectedType(e.value)}
          options={alloys}
          optionLabel="name"
          editable
          placeholder="Select a Type"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="w-full mb-4 md:w-1/3">
        <Dropdown
          value={selectedSize}
          onChange={(e) => setselectedSize(e.value)}
          options={graphOptions}
          optionLabel="label"
          editable
          placeholder="Select a Graph"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        onClick={getBtaGraph}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded shadow-md hover:bg-blue-600"
      >
        Show Graph
      </button>
    </div>
  );
}
