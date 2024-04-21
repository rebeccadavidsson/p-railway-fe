import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const [checkoutSession, setCheckoutSession] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const sessionId = searchParams.get('session_id');

                // Make a request to the backend server with the session ID
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkout-session/${sessionId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch checkout session');
                }

                const data = await response.json();
                console.log(data, "DATA")
                setCheckoutSession(data);
            } catch (error) {
                console.error('Error fetching checkout session:', error);
            }
        };

        fetchCheckoutSession();
    }, [location.search]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-semibold mb-4">Order Details</h2>
                {checkoutSession ? (
                    <div>
                        <p className="text-lg mb-4">Thank you for your
                            order, {checkoutSession.customer_details.name}!</p>
                        <div className="bg-gray-100 rounded-lg p-4 mb-4">
                            <p className="text-gray-600 mb-2">Total Price: €{checkoutSession.amount_total / 100}</p>
                            <div className="mb-2">
                                <p className="font-semibold">Billing Address</p>
                                <p>{checkoutSession.customer_details.address.line1}</p>
                                <p>{checkoutSession.customer_details.address.postal_code} {checkoutSession.customer_details.address.city}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Shipping Address</p>
                                <p>{checkoutSession.shipping.address.line1}</p>
                                <p>{checkoutSession.shipping.address.postal_code} {checkoutSession.shipping.address.city}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading order details...</p>
                )}
            </div>
        </div>
    );
};

export default SuccessPage;
