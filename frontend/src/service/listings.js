export async function getListings() {
  const response = await fetch("http://localhost:5000/api/listings");
  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }
  return await response.json();
}

export async function getListingById(id) {
  const response = await fetch(`http://localhost:5000/api/listings/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch listing");
  }
  return await response.json();
}
