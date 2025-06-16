import Cookies from "js-cookie";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const login = async (form, navigate) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      return data.error || "Login failed";
    }

    Cookies.set("authToken", data.token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
    return null;
  } catch (err) {
    console.error("Login error:", err);
    return "An unexpected error occurred";
  }
};

export const register = async (form, navigate) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      return data.error || "Registration failed";
    }

    Cookies.set("authToken", data.token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/"); // or to /dashboard, etc.
    return null;
  } catch (err) {
    console.error("Registration error:", err);
    return "An unexpected error occurred";
  }
};

export const logout = (navigate) => {
  Cookies.remove("authToken");
  localStorage.removeItem("user");
  navigate("/login");
};
