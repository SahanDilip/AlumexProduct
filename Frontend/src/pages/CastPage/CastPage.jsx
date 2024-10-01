import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { alloys, graphs } from "../../assets/asset";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space } from "antd";
import useAuth from "../../hooks/useAuth";
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
import dayjs from 'dayjs';
import "./CastPage.css";

export default function CastPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const sheetName = "Cast";

  const changeDateHandler = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const getBtaGraph = () => {
    navigate(
      `/graph?type=${encodeURIComponent(
        selectedType
      )}&size=${encodeURIComponent(selectedSize)}&startdate=${encodeURIComponent(
        startdate
      )}&enddate=${encodeURIComponent(
        enddate
      )}&sheet=${encodeURIComponent(
        sheetName
      )}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="flex items-center gap-3 p-10 mx-auto bg-gray-300 shadow-xl rounded-xl w-[500px]"> {/* Increased width to 500px */}
        <form className="w-full">
        <div className="mb-4">
            <Dropdown
              value={selectedType}
              onChange={(e) => setSelectedType(e.value)}
              options={alloys}
              optionLabel="name"
              editable
              placeholder="Select an Alloy Type"
              className="w-full p-2 bg-white border border-gray-400 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <Dropdown
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.value)}
              options={graphs}
              optionLabel="label"
              editable
              placeholder="Select a Size"
              className="w-full p-2 bg-white border border-gray-400 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <div className="w-full p-2 bg-white border border-gray-400 rounded-md shadow-sm"> {/* Added bg-white to remove transparency */}
              <Space direction="vertical">
                <RangePicker
                  defaultValue={[
                    dayjs("2024/01/01", dateFormat),
                    dayjs("2024/01/01", dateFormat),
                  ]}
                  format={dateFormat}
                  onChange={changeDateHandler}
                />
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
          className="flex justify-center mx-auto mt-10 btn rounded-xl"
          style={{
            backgroundColor: "#1f883d",
            padding: "8px",
            marginTop: "16px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/cast-add")}
        >
          Add New Data
        </button>
      )}
    </div>
  );
}
