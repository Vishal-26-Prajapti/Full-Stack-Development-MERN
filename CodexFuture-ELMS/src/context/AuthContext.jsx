/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";

const BACKEND_URL = "http://localhost:5000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch current session user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/current-user`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.loggedIn) setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};