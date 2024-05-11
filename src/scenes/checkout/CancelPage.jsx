import React from 'react';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { Button } from '@mui/material';

const CancelPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div style={{minHeight: '70vh'}} className="bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-semibold mb-4">Order Cancelled</h2>
                <p className="text-lg mb-4">Your order has been cancelled. If you have any questions, please contact us.</p>
                <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                        backgroundColor: shades.primary[400],
                        boxShadow: "none",
                        color: "white",
                        borderRadius: 0,
                        padding: "15px 40px",
                    }}
                    onClick={handleGoHome}>
                    Homepage
                </Button>
            </div>
        </div>
    );
};

export default CancelPage;