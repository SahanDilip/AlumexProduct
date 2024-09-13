import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await axios.get("/auth/check", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("User is not authenticated", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuth();
  }, []);

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
