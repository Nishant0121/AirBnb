import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from './ui/button';

export function StripePayment({ amount, onSuccess, onCancel, userId, listing, selectedDates }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Validate amount
            if (isNaN(amount) || amount <= 0) {
                throw new Error('Invalid payment amount');
            }

            // Create payment method
            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (stripeError) {
                throw stripeError;
            }

            // Call backend to process payment
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    amount: amount,
                    userId,
                    listingId: listing._id,
                    startDate: selectedDates.startDate,
                    endDate: selectedDates.endDate,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Payment failed');
            }

            // Handle 3D Secure if required
            if (data.requiresAction) {
                const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
                    data.clientSecret
                );

                if (confirmError) {
                    throw confirmError;
                }

                if (paymentIntent.status === 'succeeded') {
                    onSuccess({
                        ...data,
                        paymentId: paymentIntent.id
                    });
                } else {
                    throw new Error('Payment failed after authentication');
                }
            } else {
                // Payment succeeded without additional action
                onSuccess(data);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
                </Button>
            </div>
        </form>
    );
}