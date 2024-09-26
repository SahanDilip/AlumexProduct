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
      <div className="absolute text-white flex justify-start flex-col items-start left-24">
        <h1 className="mb-3 text-5xl font-bold">ABC Company</h1>
        <h1 className="text-white text-4xl font-bold mb-3">Slogan</h1>
        <p className="w-1/2 mb-4 mt-4">
          ABC Company is a well-known company in the world. We specialize in
          providing top-notch services and products that cater to the needs of
          our diverse clientele. Our commitment to excellence and innovation has
          made us a leader in the industry.
        </p>
      </div>
      <div className="absolute left-24 bottom-48 flex flex-row gap-6">
        <div>
          <button
            className="custom-button text-xl text-white px-8 py-2 bg-transparent border-2 border-white rounded-lg font-bold hover:bg-green-500 "
            size="large"
            onClick={() => navigate("/cast")}
          >
            Cast
          </button>
        </div>
        <div>
          <button
            className="custom-button text-xl bg-transparent border-2 border-white rounded-lg text-white  px-8 py-2 font-bold hover:bg-green-500 "
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
