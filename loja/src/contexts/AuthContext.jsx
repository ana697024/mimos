import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi } from "../Api/fakeApi";

const AuthContext = createContext();

// Funções de Autenticação Incorporadas
// (Baseadas na suposição da sua arquitetura)

async function handleLogin(username, password, setUser, setToken, apiFn) {
  const data = await apiFn(username, password);
  // No mundo real, você faria uma chamada API para validar o token
  // e buscar os dados do usuário. Aqui, estamos simulando.
  const user = { username: username, token: data.token }; 
  setUser(user);
  setToken(data.token);
  return user;
}

function handleLogout(setUser, setToken) {
  setUser(null);
  setToken(null);
}

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
    // Chama a função de login interna
    return handleLogin(username, password, setUser, setToken, loginApi);
  }

  function logout() {
    // Chama a função de logout interna
    handleLogout(setUser, setToken);
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