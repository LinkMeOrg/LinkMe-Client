import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem("token");
  const refreshTokenFromStorage = localStorage.getItem("refreshToken");
  const userFromStorage = localStorage.getItem("user");

  let parsedUser = null;
  try {
    parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    parsedUser = null;
    localStorage.removeItem("user");
  }

  const [token, setToken] = useState(tokenFromStorage);
  const [refreshToken, setRefreshToken] = useState(refreshTokenFromStorage);
  const [user, setUser] = useState(parsedUser);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL; // For Vite

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  // Refresh access token
  const refreshAccessToken = async () => {
    if (isRefreshing) return null;

    setIsRefreshing(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Update tokens
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        setToken(data.token);
        setRefreshToken(data.refreshToken);

        setIsRefreshing(false);
        return data.token;
      } else {
        // Refresh token expired or invalid, logout user
        logout();
        setIsRefreshing(false);
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      setIsRefreshing(false);
      return null;
    }
  };

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!token || !refreshToken) return;

    const checkTokenExpiry = () => {
      if (isTokenExpired(token)) {
        refreshAccessToken();
      }
    };

    // Check immediately
    checkTokenExpiry();

    // Check every 5 minutes
    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token, refreshToken]);

  const login = (token, refreshToken, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setRefreshToken(refreshToken);
    setUser(userData);
  };

  const logout = async () => {
    // Call logout API to invalidate refresh token
    if (user?.id) {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }

    // Clear local storage and state
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const isAuthenticated = () => !!token && !isTokenExpired(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        user,
        login,
        logout,
        isAuthenticated,
        refreshAccessToken,
        isRefreshing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
