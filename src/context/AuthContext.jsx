import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  function adminLogin(password) {
    if (password === "orthonexis2024") {
      setIsAdmin(true);
      return true;
    }
    return false;
  }
  function adminLogout() { setIsAdmin(false); }

  return (
    <AuthContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
