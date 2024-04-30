import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";

export const Page = ({id}) => {
    const [pageData, setData] = useState({
        title: '',
        description: '',
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pages/` + id + '?populate=image', {
                    method: "GET"
                });

                // Check if the response is successful
                if (response.ok) {
                    const data = await response.json();
                    console.log(data, "data?.data?.attributes")
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
    }, [id]);

    return (
        <div className="max-w-xl m-auto flex-auto">
            <Box width="80%" margin="80px auto">
                <Typography
                    mb="20px"
                    variant="h3"
                    fontWeight="bold"> {pageData.title}</Typography>
                <ReactMarkdown children={pageData?.description}/>

                {pageData.image && (<img src={pageData.image?.data?.attributes?.url} alt={pageData.title} className="w-full mt-10"/>)}

            </Box>
        </div>
    );
}