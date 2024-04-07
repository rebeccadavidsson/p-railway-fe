import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { Link } from 'react-router-dom';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const breakPoint = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems() {
        const items = await fetch(
            `${process.env.REACT_APP_API_URL}/api/items?populate=image`,
            {method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
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

            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 2, 750: 2}}
            >
                <Masonry gutter={"20px"}>
                    {items.filter(item => value === "all" || item.attributes.category === value).map((image, index) => (
                        <Link to={`/item/${image?.attributes?.image?.data?.id}`}>
                            <img key={index} src={image?.attributes?.image?.data?.attributes?.url} alt={`gallery-item-${index}`}/>
                        </Link>
                        )
                    )}
                </Masonry>
            </ResponsiveMasonry>
        </Box>
    );
};

export default ShoppingList;
