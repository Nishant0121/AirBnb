// components/StripeProvider.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

export default function StripeProvider({ children }) {
    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        const initializeStripe = async () => {
            try {
                const stripeObj = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
                setStripe(stripeObj);
            } catch (error) {
                console.error('Failed to load Stripe:', error);
            }
        };

        initializeStripe();
    }, []);

    if (!stripe) return <div className="text-center mt-10">Loading payment system...</div>;

    return <Elements stripe={stripe}>{children}</Elements>;
}