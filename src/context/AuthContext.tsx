"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LoginResponse,
  SessionValidationResponse,
  UserData,
} from "@/types/auth";

interface AuthContextType {
  user: UserData | null;
  sessionId: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (response: LoginResponse) => void;
  logout: () => void;
  validateSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = (response: LoginResponse) => {
    setUser(response.data);
    setSessionId(response.session_id);
    setRole(response.role);
    setIsAuthenticated(true);
    localStorage.setItem("sessionId", response.session_id);
  };

  const logout = () => {
    setUser(null);
    setSessionId(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("sessionId");
    router.push("/login");
  };

  const validateSession = async (): Promise<boolean> => {
    const storedSessionId = localStorage.getItem("sessionId");

    if (!storedSessionId) {
      logout();
      return false;
    }

    try {
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: storedSessionId }),
      });

      const data: SessionValidationResponse = await response.json();

      if (data.valid) {
        setUser(data.data);
        setSessionId(data.session_id);
        setRole(data.role);
        setIsAuthenticated(true);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error("Session validation error:", error);
      logout();
      return false;
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        sessionId,
        role,
        isAuthenticated,
        login,
        logout,
        validateSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
