
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // This is a simple authentication mechanism
  // In a real application, you would want to use a more secure approach
  const login = (password: string) => {
    // Replace 'your-secure-password' with your desired password
    // For security, consider using environment variables for this
    const correctPassword = "mall-magic-2024";
    const isValid = password === correctPassword;
    
    if (isValid) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    }
    
    return isValid;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
