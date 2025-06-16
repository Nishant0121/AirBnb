
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // Function to validate the token (you'd typically call your backend API here)
  const validateToken = async (token) => {
    console.log(token);
    return true;
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = Cookies.get("authToken");
      if (token) {
        const valid = await validateToken(token);
        if (valid) {
          setIsLogin(true);
          setUser(localStorage.getItem("user"));
        } else {
          setIsLogin(false);
          setUser(null);
        }
      } else {
        setIsLogin(false);
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AppContext.Provider value={{ user, isLogin }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
