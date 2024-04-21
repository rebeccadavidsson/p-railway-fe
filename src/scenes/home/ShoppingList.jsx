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

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const [loading, setLoading] = useState(true); // State to control loading visibility
    const items = useSelector((state) => state.cart.items);
    const breakPoint = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems() {
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
            setLoading(false); // Set loading state to false regardless of success or failure
        }
    }

    useEffect(() => {
        getItems();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box width="80%" margin="80px auto">
            <img alt={'logo'} src={'logo.png'} className={'max-w-[300px] m-auto'}/>
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
                <Tab label="OIL" value="oil"/>
                <Tab label="ACRYL" value="acryl"/>
            </Tabs>

            <CSSTransition
                in={loading} // Show loader when loading state is true
                classNames="fade"
                unmountOnExit
            >
                <div className="relative mt-8">
                    <div className="inset-0 flex items-center justify-center">
                        <div className="text-center p-8 rounded-lg shadow-lg bg-gray-100">
                            <p className="text-lg mb-4">Loading items...</p>
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700 m-auto"></div>
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
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 2}}
                >
                    <Masonry gutter={"20px"}>
                        {items.filter(item => value === "all" || item.attributes.category === value).map((image, index) => (
                            <Link to={`/item/${image?.attributes?.image?.data?.id}`} key={index}>
                                <LazyLoad height={400} once>
                                    <img
                                        className="transition duration-300 ease-in-out transform hover:scale-110 hover:border-gray-400 hover:shadow-lg"
                                        src={image?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}
                                        alt={`gallery-item-${index}`}
                                        data-srcset={`
                                          ${image?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url} 187w,
                                          ${image?.attributes?.image?.data?.attributes?.formats?.small?.url} 500w,
                                          ${image?.attributes?.image?.data?.attributes?.formats?.medium?.url} 750w,
                                          ${image?.attributes?.image?.data?.attributes?.url} 1000w
                                        `}
                                        sizes="(max-width: 600px) 80vw, (max-width: 1024px) 50vw, 1000px"
                                        style={{cursor: "pointer"}}
                                        loading="lazy"
                                    />
                                </LazyLoad>
                            </Link>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </CSSTransition>
        </Box>
    );
};

export default ShoppingList;