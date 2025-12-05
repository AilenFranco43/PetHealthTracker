import { createContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest, getCurrentUserRequest, registerRequest } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const current = await getCurrentUserRequest();
        console.log("Current user:", current);
        setUser(current);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  const register = async (username, email, password) => {
    const createdUser = await registerRequest(username, email, password);
    setUser(createdUser);
  };


  const login = async (email, password) => {
    await loginRequest(email, password);

    const current = await getCurrentUserRequest();
    setUser(current);
  };


  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
