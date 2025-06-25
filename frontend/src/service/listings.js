import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getListings = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/listings`);
    const data = res.data;
    if (!res.data) {
      throw new Error("Failed to fetch listings");
    }
    return data;
  } catch (err) {
    console.error("Error fetching listings:", err);
    throw err;
  }
};

export const getListingById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/listings/${id}`);
    const data = res.data;
    if (!res.data) {
      throw new Error("Failed to fetch listing");
    }
    return data;
  } catch (err) {
    console.error("Error fetching listing:", err);
    throw err;
  }
};
