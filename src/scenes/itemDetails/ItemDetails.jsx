import { Box, Button, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import MainCarousel from "../home/MainCarousel";

const ItemDetails = () => {
    const dispatch = useDispatch();
    const {itemId} = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(0);
    const [item, setItem] = useState(null);
    const [images, setImages] = useState([]);
    const [items, setItems] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItem() {
        // TODO replace localhost
        const item = await fetch(
            `http://localhost:1337/api/items/${itemId}?populate=image&populate=subimages`,
            {
                method: "GET",
            }
        );
        const itemJson = await item.json();
        if (itemJson.data) {
            const imagesArray = [itemJson.data.attributes.image.data];
            if (itemJson.data?.attributes?.subimages.length > 0) {
                imagesArray.push(itemJson.data.attributes.subimages.data);
            }
            setImages(imagesArray);
        }
        setItem(itemJson.data);
    }

    // TODO: why both?
    async function getItems() {
        const items = await fetch(
            `http://localhost:1337/api/items?populate=image&populate=subimages`,
            {
                method: "GET",
            }
        );
        const itemsJson = await items.json();
        setItems(itemsJson.data);
    }

    // TODO: waarom 2x?
    useEffect(() => {
        getItem();
        getItems();
    }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box width="80%" m="80px auto">
            <Box sx={{ flexWrap: 'wrap', display: 'flex' }}  columnGap="40px">
                {/* IMAGES */}

                <Box flex="1 1 40%" mb="0">
                    {item?.attributes &&
                        <MainCarousel images={images}/>
                    }
                </Box>

                {/* ACTIONS */}
                <Box flex="1 1 50%" mb="40px">
                    <Box m="65px 0 25px 0">
                        <Typography>{item?.attributes?.category?.toUpperCase()}</Typography>
                        <Typography variant="h2">{item?.attributes?.name}</Typography>
                        <Typography fontWeight="bold">€ {item?.attributes?.price}</Typography>
                    <Typography sx={{mt: "20px"}}>
                        {item?.attributes?.description}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" minHeight="50px">
                    <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[300]}`}
                        mr="20px"
                        p="2px 5px"
                    >
                        <IconButton onClick={() => setCount(1)}>
                            <RemoveIcon/>
                        </IconButton>
                        <Typography sx={{p: "0 5px"}}>{count}</Typography>
                        <IconButton onClick={() => setCount(1)}>
                            <AddIcon/>
                        </IconButton>
                    </Box>
                    <Button
                        sx={{
                            backgroundColor: "#222222",
                            color: "white",
                            borderRadius: 0,
                            minWidth: "150px",
                            padding: "10px 40px",
                        }}
                        onClick={() => dispatch(addToCart({item: {...item, count}}))}
                    >
                        ADD TO CART
                    </Button>
                </Box>
            </Box>
        </Box>

    {/* RELATED ITEMS */
    }
    <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
            Related Work
        </Typography>
        <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            columnGap="1.33%"
            justifyContent="flex-start"
        >
            {items.slice(0, 4).map((item, i) => (
                <Item key={`${item.name}-${i}`} item={item}/>
            ))}
        </Box>
    </Box>
</Box>
)
    ;
};

export default ItemDetails;
