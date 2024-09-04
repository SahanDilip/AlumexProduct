import "./AdminDash.css";
import { useNavigate } from "react-router-dom";

function AdminDash() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/cast')}>Cast</button>
      <button onClick={() => navigate('/homoginizedpage')}>Homogenized</button>
    </div>
  );
}

export default AdminDash;
