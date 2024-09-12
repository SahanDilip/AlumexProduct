import { Routes, Route } from "react-router-dom";
import CastPage from "./pages/CastPage/CastPage";
import Login from "./pages/LoginPage/Login";
import AdminDash from "./pages/AdminPage/AdminDash";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomoginizedPage from "./pages/HomogenizedPage/HomoginizedPage";
import Hormoginize_Form from "./components/HormoginizeForm";
import Cast_Form from "./components/CastForm";
import Graph from "./pages/GraphPage/Graph";
import Register from "./pages/RegisterPage/Register";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<AdminDash />} />
        <Route path="/cast" element={<CastPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/homoginizedpage" element={<HomoginizedPage />} />
        <Route path="/hormoginize-add" element={<Hormoginize_Form />} />
        <Route path="/cast-add" element={<Cast_Form />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
