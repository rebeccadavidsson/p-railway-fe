import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';

export const Page = ({id}) => {
    const [pageData, setData] = useState({
        title: '',
        description: ''
    });

    async function getData() {
        const response = await fetch(
            "http://localhost:1337/api/pages/" + id,
            {method: "GET"}
        );
        const data = await response.json();
        setData(data?.data?.attributes);
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