const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// LOGIN
export const loginRequest = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || "Error en login");
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
};

// LOGOUT
export const logoutRequest = async () => {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

// GET CURRENT USER
export const getCurrentUserRequest = async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) return null;

  return res.json();
};

export const registerRequest = async (username, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || "Error al registrar");
  }

  return res.json();
};

