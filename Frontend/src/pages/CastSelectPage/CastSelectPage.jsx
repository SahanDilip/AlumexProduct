import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/Image.jpg";

function CastSelectPage() {
  const navigate = useNavigate(); // Use 'const' to properly define the navigate function

  return (
    <div className="admin-dash-container">
      <img src={Image} alt="Background" className="admin-dash-image" />
      <div className="flex flex-col absolute">
      <div >
        <button
          className="m-5 bg-green-500 font-semibold text-white w-3/4 p-2 rounded-lg hover:bg-green-700"
          onClick={() => {
            navigate("/cast-one"); // Correct way to call navigate
          }}
        >
          Cast Billet Metallurgical Parameters
        </button>
      </div>
      <div>
        <button
          className="m-5 bg-green-500 font-semibold text-white p-2 w-3/4 rounded-lg hover:bg-green-700"
          onClick={() => {
            navigate("/cast-two"); // Correct way to call navigate
          }}
        >
          Cast Billet Chemical Composition
        </button>
      </div>
      <div>
        <button
          className="m-5 bg-green-500 font-semibold text-white p-2 w-3/4 rounded-lg hover:bg-green-700"
          onClick={() => {
            navigate("/cast-three"); // Correct way to call navigate
          }}
        >
          Cast Billet Process Parameters
        </button>
      </div>
      </div>
    </div>
  );
}

export default CastSelectPage;
