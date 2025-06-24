import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie"; // ✅ this was missing

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const validateToken = async (token) => {
    console.log("Token to validate:", token);
    return true; // Replace with real backend check
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
      setCheckingAuth(false);
    };

    checkLoginStatus();
  }, []);

  return (
    <AppContext.Provider value={{ user, isLogin, checkingAuth }}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ This custom hook must be exported and used in your App.jsx
export const useAppContext = () => useContext(AppContext);
