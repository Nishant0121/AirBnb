// api/bookings.js

export async function createBooking(bookingData) {
  const response = await fetch("http://localhost:5000/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...bookingData,
      amount: Math.round(bookingData.totalPrice * 100), // Stripe expects cents
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create booking");
  }

  return await response.json();
}

export async function getUserBookings(userId) {
  const response = await fetch(`/api/bookings/user/${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch bookings");
  }

  return await response.json();
}

export async function getBookingById(id) {
  const response = await fetch(`/api/bookings/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch booking");
  }

  return await response.json();
}
