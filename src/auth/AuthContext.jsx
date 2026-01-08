import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id,name,email,role}
  const [loading, setLoading] = useState(true);

  async function loadMe() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadMe(); }, []);

  async function login(email, password) {
    const res = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  }

  async function register(payload) {
    const res = await api.post("/api/auth/register", payload);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
