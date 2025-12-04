import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi } from "../Api/fakeApi";
import { authLogin, authLogout } from "./authFunctions";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mimos_user"));
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("mimos_token"));

  useEffect(() => {
    if (user) localStorage.setItem("mimos_user", JSON.stringify(user));
    else localStorage.removeItem("mimos_user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("mimos_token", token);
    else localStorage.removeItem("mimos_token");
  }, [token]);

  async function login(username, password) {
    return authLogin(username, password, setUser, setToken, loginApi);
  }

  function logout() {
    authLogout(setUser, setToken);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
