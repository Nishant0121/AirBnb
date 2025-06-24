import { useState } from "react";
import { format } from "date-fns";
import { createBooking } from "../service/booking.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { StripePayment } from "../components/StripePayment";

export function BookingModal({ listing, userId, onClose }) {
    const [selectedDates, setSelectedDates] = useState({
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000 * 5), // Default to 5 days
    });
    const [step, setStep] = useState("dates"); // 'dates' or 'payment'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calculateTotal = () => {
        const days = Math.ceil(
            (selectedDates.endDate - selectedDates.startDate) / (1000 * 60 * 60 * 24)
        );
        const total = listing.pricePerNight * days + 75; // Add service fee
        return Math.round(total * 100); // Convert to cents for Stripe
    };

    const getDisplayTotal = () => {
        return (calculateTotal() / 100).toFixed(2); // Convert back to dollars for display
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setSelectedDates({
            startDate: start,
            endDate: end,
        });
    };

    const handleProceedToPayment = () => {
        setStep("payment");
    };

    const handlePaymentSuccess = async (paymentData) => {
        onClose();
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Complete your booking</DialogTitle>
                </DialogHeader>

                {step === "dates" && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium">Select Dates</h3>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm text-gray-500">Check-in</label>
                                    <input
                                        type="date"
                                        value={format(selectedDates.startDate, "yyyy-MM-dd")}
                                        onChange={(e) =>
                                            setSelectedDates({
                                                ...selectedDates,
                                                startDate: new Date(e.target.value),
                                            })
                                        }
                                        className="w-full p-2 border rounded"
                                        min={format(new Date(), "yyyy-MM-dd")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Check-out</label>
                                    <input
                                        type="date"
                                        value={format(selectedDates.endDate, "yyyy-MM-dd")}
                                        onChange={(e) =>
                                            setSelectedDates({
                                                ...selectedDates,
                                                endDate: new Date(e.target.value),
                                            })
                                        }
                                        className="w-full p-2 border rounded"
                                        min={format(
                                            new Date(selectedDates.startDate.getTime() + 86400000),
                                            "yyyy-MM-dd"
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between mb-2">
                                <span>
                                    ${listing.pricePerNight} x{" "}
                                    {Math.ceil(
                                        (selectedDates.endDate - selectedDates.startDate) /
                                        (1000 * 60 * 60 * 24)
                                    )}{" "}
                                    nights
                                </span>
                                <span>
                                    $
                                    {listing.pricePerNight *
                                        Math.ceil(
                                            (selectedDates.endDate - selectedDates.startDate) /
                                            (1000 * 60 * 60 * 24)
                                        )}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Service fee</span>
                                <span>$75</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span>${getDisplayTotal()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleProceedToPayment}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Continue to Payment"}
                        </button>
                    </div>
                )}

                {step === "payment" && (
                    <div className="space-y-4">
                        <StripePayment
                            amount={calculateTotal()} // Pass amount in cents
                            onSuccess={handlePaymentSuccess}
                            onCancel={() => setStep("dates")}
                            userId={userId}
                            listing={listing}
                            selectedDates={selectedDates}
                        />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}