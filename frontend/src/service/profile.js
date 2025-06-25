import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchUserData = async () => {
  const token = Cookies.get("authToken");

  try {
    const res = await axios.get(`${BASE_URL}/api/userdata/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

export const addListing = async (formData) => {
  const token = Cookies.get("authToken");

  try {
    const res = await axios.post(`${BASE_URL}/api/listings`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error adding listing:", err);
  }
};

// ✅ NEW: Delete a listing
export const deleteListing = async (listingId) => {
  const token = Cookies.get("authToken");

  try {
    await axios.delete(`${BASE_URL}/api/listings/${listingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    console.error("Error deleting listing:", err);
    throw err;
  }
};
