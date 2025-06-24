import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage';
import { HomePage } from './pages/HomePage';
import AuthLayout from './layouts/authLayout';
import { useAppContext } from './context/appContext';
import './App.css';
import { ListingDetailPage } from './pages/ListingDetailsPage';
import AppLayout from './layouts/appLayout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

function App() {
  const { isLogin, checkingAuth } = useAppContext();
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    // Initialize Stripe when component mounts
    const initializeStripe = async () => {
      try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        setStripePromise(stripe);
      } catch (error) {
        console.error('Failed to load Stripe:', error);
      }
    };

    initializeStripe();
  }, []);

  if (checkingAuth) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <Routes>
      {/* Auth layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={isLogin ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes with AppLayout */}
      {isLogin ? (
        <Route element={<AppLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/listing/:id"
            element={
              stripePromise ? (
                <Elements stripe={stripePromise}>
                  <ListingDetailPage />
                </Elements>
              ) : (
                <div className="text-center mt-10">Loading payment system...</div>
              )
            }
          />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;