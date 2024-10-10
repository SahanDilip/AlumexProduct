import React from "react";
import  {useNavigate}  from "react-router-dom";

function CastSelectPage() {
 const navigate = useNavigate(); // Use 'const' to properly define the navigate function

  return (
    <div className="flex flex-col">
      <div>
        <button
          onClick={() => {
            navigate("/cast-one"); // Correct way to call navigate
          }}
        >
          Cast Billet Metallurgical Parameters
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/cast-two"); // Correct way to call navigate
          }}
        >
          Cast Billet Chemical Composition
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/cast-three"); // Correct way to call navigate
          }}
        >
          Cast Billet Process Parameters
        </button>
      </div>
    </div>
  );
}

export default CastSelectPage;
