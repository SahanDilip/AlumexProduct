import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Image from "../../assets/Image.jpg";
import NavBar from "../../components/NavBar/NavBar";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="admin-dash-container">
    <NavBar />
      <img src={Image} alt="Background" className="admin-dash-image" />
      <div className="absolute flex flex-col items-start justify-start text-white left-24">
        <h1 className="mb-3 text-5xl font-bold">ABC Company</h1>
        <h1 className="mb-3 text-4xl font-bold text-white">Slogan</h1>
        <p className="w-1/2 mt-4 mb-4">
          ABC Company is a well-known company in the world. We specialize in
          providing top-notch services and products that cater to the needs of
          our diverse clientele. Our commitment to excellence and innovation has
          made us a leader in the industry.
        </p>
      </div>
      <div className="absolute flex flex-row gap-6 left-24 bottom-48">
        <div>
          <button
            className="px-8 py-2 text-xl font-bold text-white bg-transparent border-2 border-white rounded-lg custom-button hover:bg-green-500 "
            size="large"
            onClick={() => navigate("/cast-selection")}
          >
            Cast
          </button>
        </div>
        <div>
          <button
            className="px-8 py-2 text-xl font-bold text-white bg-transparent border-2 border-white rounded-lg custom-button hover:bg-green-500 "
            size="large"
            onClick={() => navigate("/homoginizedpage")}
          >
            Homogenized
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
