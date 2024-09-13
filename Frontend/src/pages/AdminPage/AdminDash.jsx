import "./AdminDash.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function AdminDash() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-end justify-center min-h-screen gap-4 pr-20 text-6xl text-left text-white bg-slate-400">
      <div>
        {/* Large Button */}
        <Button
          className="extra-large-button"
          type="primary"
          style={{
            backgroundColor: "green",
            borderColor: "green",
            width: "200px",
          }} // Custom width for larger button
          size="large" // Ant Design large size prop
          onClick={() => navigate("/cast")}
        >
          Cast
        </Button>
      </div>
      <div>
        {/* Small Button */}
        <Button
          className="extra-large-button"
          type="primary"
          style={{
            backgroundColor: "green",
            borderColor: "green",
            width: "240px",
          }} // Custom width for smaller button
          size="large" // Ant Design default size (large)
          onClick={() => navigate("/homoginizedpage")}
        >
          Homogenized
        </Button>
      </div>
    </div>
  );
}

export default AdminDash;
