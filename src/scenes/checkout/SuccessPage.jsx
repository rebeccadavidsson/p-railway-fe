import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../state';

const SuccessPage = () => {
    const location = useLocation();
    const [checkoutSession, setCheckoutSession] = useState(null);
    const [error, setError] = useState(null);
    const errorMessage = 'Oops! Something went wrong. Please try again later.';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const sessionId = searchParams.get('session_id');

                // If there is no sessionId, redirect to the homepage
                if (!sessionId) {
                    navigate('/');
                    return;
                }

                // Make a request to the backend server with the session ID
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/checkout-session/${sessionId}`);

                if (!response.ok) {
                    setError(errorMessage);
                }

                const data = await response.json();

                setCheckoutSession(data);

                // Clear the cart if the checkout session was successfully fetched
                dispatch(clearCart());
            } catch (error) {
                console.error('Error fetching checkout session:', error);
                setError(errorMessage);
            }
        };

        fetchCheckoutSession();
    }, [location.search, navigate, dispatch]);

    return (
        <div style={{minHeight: '70vh'}} className="flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-semibold mb-4">Jouw bestelling</h2>

                {error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline"> {error}</span>
                    </div>
                ) : checkoutSession ? (
                    <div>
                        <p className="text-lg mb-4">Bedankt voor jouw bestelling, {checkoutSession.customer_details.name}! Het zal zo snel mogelijk jouw kant op komen.</p>
                        <div className="bg-gray-100 rounded-lg p-4 mb-4">
                            <p className="text-gray-600 mb-2">Totaal: €{checkoutSession.amount_total / 100}</p>
                            <div className="mb-2">
                                <p className="font-semibold">Adres</p>
                                <p>{checkoutSession.customer_details.address.line1}</p>
                                <p>{checkoutSession.customer_details.address.postal_code} {checkoutSession.customer_details.address.city}</p>
                            </div>
                            {checkoutSession?.shipping &&
                                <div>
                                    <p className="font-semibold">Shipping Address</p>
                                    <p>{checkoutSession.shipping.address.line1}</p>
                                    <p>{checkoutSession.shipping.address.postal_code} {checkoutSession.shipping.address.city}</p>
                                </div>
                            }
                        </div>
                    </div>
                ) : (
                    <p>De bestelling details worden geladen...</p>
                )}
            </div>
        </div>
    );
};

export default SuccessPage;
