import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { alloys, graphs } from "../../assets/asset";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space } from "antd";
import useAuth from "../../hooks/useAuth";

export default function HomoginizedPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setselectedSize] = useState(null);
  const [date, setdate] = useState(new Date());
  const sheetName = "Homogenize";
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  const onChange = (date, dateString) => {
    setdate(dateString);
  };

  const getBtaGraph = () => {
    navigate(
      `/graph?type=${encodeURIComponent(
        selectedType
      )}&size=${encodeURIComponent(selectedSize)}&date=${encodeURIComponent(
        date
      )}&sheet=${encodeURIComponent(sheetName)}`
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-10 flex-col">
      <div className="flex items-center gap-3 p-5 mx-auto bg-gray-300 shadow-xl rounded-xl w-96">
        <form className="w-full">
          <div className="mb-4">
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
          <div className="mb-4">
            <Dropdown
              value={selectedSize}
              onChange={(e) => setselectedSize(e.value)}
              options={graphs}
              optionLabel="label"
              editable
              placeholder="Select a Size"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </div>
          </div>
          <button
            onClick={getBtaGraph}
            type="button"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded shadow-md hover:bg-blue-600"
          >
            Show Graph
          </button>
        </form>
      </div>
      {user.role === "admin" && (
        <button
          className="flex btn justify-center mx-auto rounded-xl mt-10"
          style={{
            backgroundColor: "#1f883d",
            padding: "8px",
            marginTop: "16px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/hormoginize-add")}
        >
          Add New Data
        </button>
      )}
    </div>
  );
}
