import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";

export const Page = ({id}) => {
    const [pageData, setData] = useState({
        title: '',
        description: ''
    });
    const navigate = useNavigate();

    async function getData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pages/` + id, {
                method: "GET"
            });

            // Check if the response is successful
            if (response.ok) {
                const data = await response.json();
                setData(data?.data?.attributes);
            } else if (response.status === 404) {
                // Redirect to the not-found page if the resource is not found (404)
                navigate('/not-found');
            } else {
                // Handle other error cases
                // For example, display an error message to the user
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <div className="max-w-xl m-auto">
            <Box width="80%" margin="80px auto">
                <Typography
                    mb="20px"
                    variant="h3"
                    fontWeight="bold"> {pageData.title}</Typography>
                <ReactMarkdown children={pageData?.description}/>
            </Box>
        </div>
    );
}