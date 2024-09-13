import "./AdminDash.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Image from "../../assets/Image.jpg";

function AdminDash() {
  const navigate = useNavigate();

  return (
    <div className="admin-dash-container">
      <img src={Image} alt="Background" className="admin-dash-image" />
      <div className="button-container">
        <div>
          <Button
            className="extra-large-button"
            type="primary"
            style={{
              backgroundColor: "green",
              borderColor: "green",
              width: "200px",
            }}
            size="large"
            onClick={() => navigate("/cast")}
          >
            Cast
          </Button>
        </div>
        <div>
          <Button
            className="extra-large-button"
            type="primary"
            style={{
              backgroundColor: "green",
              borderColor: "green",
              width: "240px",
            }}
            size="large"
            onClick={() => navigate("/homoginizedpage")}
          >
            Homogenized
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
