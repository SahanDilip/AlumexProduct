// App.jsx
import { Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import CastPage from "./pages/CastPage/CastPage";
import Login from "./pages/LoginPage/Login";
import AdminDash from "./pages/AdminPage/AdminDash";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomoginizedPage from "./pages/HomogenizedPage/HomoginizedPage";
import Hormoginize_Form from "./components/HormoginizeForm";
import Cast_Form from "./components/CastForm";
import Graph from "./pages/GraphPage/Graph";
import Register from "./pages/RegisterPage/Register";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ roleRequired }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" Login />;
  }

  if (roleRequired && user.role !== roleRequired) {
   
    return <Navigate to="/landingpage" LandingPage />;
  }

  return <Outlet />;
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landingpage" element={<LandingPage />} />

        <Route element={<ProtectedRoute roleRequired="admin" />}>
          <Route path="/hormoginize-add" element={<Hormoginize_Form />} />
          <Route path="/cast-add" element={<Cast_Form />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminDash />} />
          <Route path="/homoginizedpage" element={<HomoginizedPage />} />
          <Route path="/cast" element={<CastPage />} />
          <Route path="/graph" element={<Graph />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
