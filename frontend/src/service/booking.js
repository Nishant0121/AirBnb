import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Cookies from "js-cookie";

export const createBooking = async (bookingData) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/bookings`, {
      ...bookingData,
      amount: Math.round(bookingData.totalPrice * 100), // Stripe expects cents
    });

    if (!res.data) {
      throw new Error(res.data.error || "Failed to create booking");
    }

    return res.data;
  } catch (err) {
    console.error("Error creating booking:", err);
    throw err;
  }
};

export const getUserBookings = async () => {
  const token = Cookies.get("authToken");

  try {
    const res = await axios.get(`${BASE_URL}/api/bookings/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    throw err;
  }
};

export const getBookingById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/bookings/${id}`);

    if (!res.data) {
      throw new Error(res.data.error || "Failed to fetch booking");
    }

    return res.data;
  } catch (err) {
    console.error("Error fetching booking:", err);
    throw err;
  }
};
