import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById } from "../service/listings";
import { BookingModal } from "./BookingModel";
import {
    Star,
    MapPin
} from "lucide-react";

export function ListingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [userId] = useState("684eee7f702e167943b0fa34");

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await getListingById(id);
                setListing(data);
            } catch (error) {
                console.error("Failed to fetch listing:", error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id, navigate]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!listing) return <div className="text-center py-20">Listing not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="inline-flex items-center">
                        <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                            Home
                        </button>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-sm font-medium text-gray-500">{listing.title}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Images */}
                <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden">
                        <img
                            src={listing.images?.[0] || '/placeholder-image.jpg'}
                            alt={listing.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {listing.images?.slice(1).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-full h-32 object-cover rounded"
                            />
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
                    <div className="flex items-center mb-4 text-gray-700">
                        <MapPin className="mr-2 text-gray-500" />
                        <span>{listing.location}</span>
                    </div>

                    <div className="border-t border-b border-gray-200 py-6 my-6">
                        <h2 className="text-xl font-semibold mb-4">About this place</h2>
                        <p className="text-gray-700">{listing.description}</p>
                    </div>

                    {/* Booking */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 sticky top-4">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="text-2xl font-bold">${listing.pricePerNight}</span>
                                <span className="text-gray-500"> / night</span>
                            </div>
                            <div className="flex items-center">
                                <Star className="text-yellow-400 mr-1" />
                                <span>4.8</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowBookingModal(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                        >
                            Reserve
                        </button>

                        <div className="mt-4 text-center text-gray-500 text-sm">
                            You won't be charged yet
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <div className="flex justify-between mb-2">
                                <span>${listing.pricePerNight} x 5 nights</span>
                                <span>${listing.pricePerNight * 5}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Service fee</span>
                                <span>$75</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span>${listing.pricePerNight * 5 + 75}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <BookingModal
                    listing={listing}
                    onClose={() => setShowBookingModal(false)}
                    userId={userId}
                />
            )}
        </div>
    );
}
