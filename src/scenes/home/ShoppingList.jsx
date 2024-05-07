import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import LazyLoad from 'react-lazyload';
import { Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const [loading, setLoading] = useState(true); // State to control loading visibility
    const [profile, setProfile] = useState(null);
    const items = useSelector((state) => state.items ?? []);
    const breakPoint = useMediaQuery("(min-width:600px)");
    const cachedItems = useSelector((state) => state.items);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 'about' && !profile) {
            getProfile();
        }
    };

    async function getItems() {
        if (cachedItems !== undefined && cachedItems?.length > 0) {
            dispatch(setItems(cachedItems));
            setLoading(false);
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/items?populate=image`,
                { method: "GET" }
            );
            const itemsJson = await response.json();
            dispatch(setItems(itemsJson.data));
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    }

    async function getProfile() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pages/3?populate=image`, {
                method: "GET"
            });

            // Check if the response is successful
            if (response.ok) {
                const data = await response.json();
                setProfile(data?.data?.attributes);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    useEffect(() => {
        getItems();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box className={'m-auto mt-20 ml-4 mr-4'}>
            <img alt={'logo'} src={'logo.png'} className={'max-w-[300px] m-auto'}/>

            {/*// A search bar that searches on the title of the item*/}
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{sx: {display: breakPoint ? "block" : "none"}}}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap",
                    },
                }}
            >
                <Tab label="ALL" value="all"/>
                <Tab label="AVAILABLE" value="available"/>
                <Tab label="ABOUT / CONTACT" value="about"/>
            </Tabs>

            <CSSTransition
                in={loading} // Show loader when loading state is true
                classNames="fade"
                unmountOnExit
                timeout={0}
            >
                <div className="relative mt-8">
                    <div className="inset-0 flex items-center justify-center">
                        <div className="text-center p-8 rounded-lg">
                            <p className="text-lg mb-4">Loading items...</p>
                            <div className="loader m-auto"></div>
                        </div>
                    </div>
                </div>
            </CSSTransition>

            <CSSTransition
                in={!loading}
                timeout={1000}
                classNames="fade"
                unmountOnExit
            >
                {value === "about" ?
                    (profile?.title && (
                        <Box width="60%" className={'m-auto'}>
                            <Typography
                                mb="20px"
                                variant="h3"
                                fontWeight="bold"> {profile.title}</Typography>
                            <ReactMarkdown children={profile?.description}/>

                            {profile.image?.data?.attributes?.url && (
                                <img src={profile.image?.data?.attributes?.url} alt={profile.title}
                                     className="w-full mt-10"/>)}
                        </Box>
                    ))
                    :

                <ResponsiveMasonry
                    columnsCountBreakPoints={{750: 2, 1440: 3}}
                >
                    <Masonry gutter={"10px"}>

                        {items?.filter(item => value === "all" || (value === 'available' && item.attributes.available === true)).map((image, index) => (
                            <Link to={`/item/${image?.attributes?.image?.data?.id}`} key={index}>
                                <LazyLoad once>
                                    <img
                                        className="transition duration-300 ease-in-out transform hover:scale-105 hover:border-gray-400 hover:shadow-lg"
                                        src={image?.attributes?.image?.data?.attributes?.formats?.small?.url ?? image?.attributes?.image?.data?.attributes?.url}
                                        alt={image?.attributes?.name}
                                        data-srcset={`
                                          ${image?.attributes?.image?.data?.attributes?.formats?.small?.url ?? image?.attributes?.image?.data?.attributes?.url} 187w,
                                          ${image?.attributes?.image?.data?.attributes?.formats?.medium?.url ?? image?.attributes?.image?.data?.attributes?.url} 500w,
                                          ${image?.attributes?.image?.data?.attributes?.url} 1000w
                                        `}
                                        sizes="(max-width: 600px) 80vw, (max-width: 1024px) 60vw, 1000px"
                                        style={{cursor: "pointer", width: "100%"}}
                                        loading="lazy"
                                    />
                                </LazyLoad>
                            </Link>
                        ))})
                    </Masonry>
                </ResponsiveMasonry>
                }
            </CSSTransition>
        </Box>
    );
};

export default ShoppingList;
