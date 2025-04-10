"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "nextjs-toploader/app";
import axios from "axios";

// Types
interface AuthConfig {
  apiKey: string;
  baseUrl: string;
}

// Config should be in your app's environment variables
const config: AuthConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
};

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      setIsLoading(true);
      try {
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(";").shift();
          return null;
        };

        const session_id = getCookie("session_id");
        const user_id = getCookie("user_id");
        const user_type = getCookie("user_role");

        if (!session_id || !user_id) {
          throw new Error("Missing session or user ID");
        }

        const formData = new FormData();
        formData.append("req_data", "sessionaValidation");
        formData.append("session_id", session_id);
        formData.append("user_id", user_id);
        formData.append("user_role", user_type || "");

        const response = await axios.post(`${config.baseUrl}users`, formData);

        if (response.data.valid) {
          setIsAuthorized(true);
        } else {
          throw new Error("Invalid session");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  // Function to protect checkout action
  const requireAuth = useCallback(() => {
    if (!isAuthorized) {
      router.push("/login"); // Redirect to login if not authorized
      return false;
    }
    return true;
  }, [isAuthorized, router]);

  return { isAuthorized, requireAuth, isLoading };
};

export default useAuth;
