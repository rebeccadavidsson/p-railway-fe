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
    const items = useSelector((state) => state.items ?? []);
    const breakPoint = useMediaQuery("(min-width:600px)");
    const cachedItems = useSelector((state) => state.items);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                <Tab label="OIL" value="oil"/>
                <Tab label="ACRYL" value="acryl"/>
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
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 2}}
                >
                    <Masonry gutter={"10px"}>
                        {items?.filter(item => value === "all" || item.attributes.category === value).map((image, index) => (
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
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </CSSTransition>
        </Box>
    );
};

export default ShoppingList;
