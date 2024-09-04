import { Routes, Route } from "react-router-dom";
import CastPage from "./pages/CastPage/CastPage";
import Login from "./pages/LoginPage/Login";
import AdminDash from "./pages/AdminPage/AdminDash";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomoginizedPage from "./pages/HomogenizedPage/HomoginizedPage";
import Form from "./components/Form";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<AdminDash />} />
        <Route path="/cast" element={<CastPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/homoginizedpage" element={<HomoginizedPage />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}
export default App;
