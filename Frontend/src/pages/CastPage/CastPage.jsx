import { alloys } from "../../assets/assset";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function CastPage() {
  const [selectedType, setSelectedType] = useState(null);
  const getGraph = () => {
    console.log("get the relevant data from the Sheet and get data");
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
      <button onClick={getGraph}>DA</button>
    </div>
  );
}
