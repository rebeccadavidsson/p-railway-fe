import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import { addToCart, removeFromCart } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../home/MainCarousel";
import { CSSTransition } from 'react-transition-group';


const ItemDetails = () => {
    const dispatch = useDispatch();
    const {itemId} = useParams();
    const count = 1;
    const [item, setItem] = useState(null);
    const [images, setImages] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const cart = useSelector((state) => state.cart);
    const isInCart = cart?.some(cartItem => cartItem?.id === item?.id);

    async function getItem() {
        const item = await fetch(
            `${process.env.REACT_APP_API_URL}/api/items/${itemId}?populate=image&populate=subimages`,
            {
                method: "GET",
            }
        );
        const itemJson = await item.json();
        if (itemJson.data) {
            const imagesArray = [itemJson.data.attributes.image.data];
            if (itemJson.data?.attributes?.subimages?.data?.length > 0) {
                imagesArray.push(...itemJson.data.attributes.subimages.data);
            }
            setImages(imagesArray);
        }
        setItem(itemJson.data);
    }

    async function getItems() {
        const items = await fetch(
            `${process.env.REACT_APP_API_URL}/api/items?populate=image&populate=subimages`,
            {
                method: "GET",
            }
        );
        const itemsJson = await items.json();
        setItems(itemsJson.data);
        setLoading(false);
    }

    useEffect(() => {
        getItem();
        getItems();

        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500); // Adjust the delay time as needed (in milliseconds)

        return () => clearTimeout(timer);
    }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderRelatedItems = () => {
        const relatedItems = items.slice(0, 5).filter((newItem, i) => {
            return newItem.id.toString() !== itemId;
        });

        return relatedItems.map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item}/>
        ));
    };

    return (
        <div className="transition-opacity duration-500 ease-in-out max-w-4xl m-auto" style={{opacity: loading ? 0.5 : 1}}>
            <Box width="80%" m="80px auto">
                {loading ? (
                    <div className="flex items-center justify-center h-screen">
                        <div
                            className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <CSSTransition
                        in={showContent}
                        timeout={500}
                        classNames="fade"
                        appear
                    >
                        <div className="fade">
                            <Box sx={{flexWrap: 'wrap', display: 'flex'}} columnGap="40px">
                                {/* IMAGES */}
                                <Box flex="1 1 40%" mb="0">
                                    {item?.attributes && <MainCarousel images={images}/>}
                                </Box>

                                {/* ACTIONS */}
                                <Box flex="1 1 50%" mb="40px">
                                    <Box m="65px 0 25px 0">
                                        <Typography>{item?.attributes?.category?.toUpperCase()}</Typography>
                                        <Typography variant="h2">{item?.attributes?.name}</Typography>
                                        {item?.attributes?.width && item?.attributes?.height && (<Typography className="text-sm pb-1">{item?.attributes?.width} x {item?.attributes?.height}</Typography>)}
                                        <Typography fontWeight="bold">€ {item?.attributes?.price}</Typography>
                                        <Typography sx={{mt: "20px"}}>{item?.attributes?.description}</Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" minHeight="50px">
                                        <Button
                                            sx={{
                                                backgroundColor: "#222222",
                                                color: "white",
                                                borderRadius: 0,
                                                minWidth: "150px",
                                                padding: "10px 40px",
                                                ':hover': {
                                                    backgroundColor: 'neutral.dark',
                                                    color: 'white',
                                                },
                                            }}
                                            onClick={() => isInCart ? dispatch(removeFromCart({id: item?.id})) : dispatch(addToCart({item: {...item, count}}))}
                                        >
                                            {isInCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>

                            <Box mt="50px" width="100%">
                                <Typography variant="h3" fontWeight="bold">
                                    Related Work
                                </Typography>
                                <Box
                                    mt="20px"
                                    display="flex"
                                    flexWrap="wrap"
                                    justifyContent="flex-start"
                                    className={'gap-5'}
                                >
                                    {renderRelatedItems()}
                                </Box>
                            </Box>
                        </div>
                    </CSSTransition>
                )}
            </Box>
        </div>

    );
};

export default ItemDetails;
