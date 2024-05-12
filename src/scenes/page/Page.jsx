import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from "react-router-dom";

export const Page = ({id}) => {
    const [pageData, setData] = useState({
        title: '',
        description: '',
        image: ''
    });
    const navigate = useNavigate();

    const markdownComponents = {
        h1: ({node, ...props}) => <Typography variant="h1" {...props} />,
        h2: ({node, ...props}) => <Typography variant="h2" {...props} />,
        h3: ({node, ...props}) => <Typography variant="h3" {...props} />,
        h4: ({node, ...props}) => <Typography variant="h4" {...props} />,
        h5: ({node, ...props}) => <Typography variant="h5" {...props} />,
        h6: ({node, ...props}) => <Typography variant="h6" {...props} />,
        p: ({node, ...props}) => <Typography {...props} />,
        a: ({node, ...props}) => <Link {...props} />,
        // Add more components as needed
    };

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pages/` + id + '?populate=image', {
                    method: "GET"
                });

                // Check if the response is successful
                if (response.ok) {
                    const data = await response.json();
                    setData(data?.data?.attributes);
                } else if (response.status === 404 || response.status === 400) {
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

        getData();
    }, [id, navigate]);

    return (
        <div className="max-w-4xl m-auto flex-auto w-full">
            <Box width="80%" margin="80px auto">
                <Typography
                    mb="20px"
                    variant="h3"
                    fontWeight="bold"> {pageData.title}</Typography>
                <ReactMarkdown components={markdownComponents} children={pageData?.description} breaks={true}/>

                {pageData.image?.data?.attributes?.url && (<img src={pageData.image?.data?.attributes?.url} alt={pageData.title} className="w-1/2 mt-10"/>)}

            </Box>
        </div>
    );
}