import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (form, navigate) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, form);

    const data = res.data;

    if (!res.data) {
      return data.error || "Login failed";
    }

    Cookies.set("authToken", data.token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/home";
  } catch (err) {
    console.error("Login error:", err);
    return "An unexpected error occurred";
  }
};

export const register = async (form, navigate) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/register`, form);

    const data = res.data;

    if (!res.data) {
      return data.error || "Registration failed";
    }

    Cookies.set("authToken", data.token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/";
    return null;
  } catch (err) {
    console.error("Registration error:", err);
    return "An unexpected error occurred";
  }
};

export const logout = (navigate) => {
  Cookies.remove("authToken");
  localStorage.removeItem("user");
  window.location.href = "/";
};
