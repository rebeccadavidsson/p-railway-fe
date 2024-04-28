import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { shades } from "../theme";
import { addToCart, removeFromCart } from "../state";
import { useNavigate } from "react-router-dom";
import LazyLoad from 'react-lazyload';

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = 1;
  const [isHovered, setIsHovered] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  const isInCart = cart.some(cartItem => cartItem.id === item.id);

  const { category, price, name, image } = item.attributes;

    const handleClick = () => {
        if (isInCart) {
            dispatch(removeFromCart({id: item.id}));
        } else {
            dispatch(addToCart({ item: { ...item, count } }));
        }
    };

  return (
      <Box width={width}>
        <Box
            position="relative"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
        >
            {image?.data?.attributes?.formats && (
                <LazyLoad height={400} once>
                    <img
                        alt={name}
                        width="300px"
                        height="400px"
                        src={image.data.attributes.formats.small.url ?? image?.attributes?.image?.data?.attributes?.url}
                        data-srcset={`
                          ${image?.attributes?.image?.data?.attributes?.formats?.small?.url ?? image?.attributes?.image?.data?.attributes?.url } 187w,
                          ${image?.attributes?.image?.data?.attributes?.formats?.medium?.url ?? image?.attributes?.image?.data?.attributes?.url} 500w,
                          ${image?.attributes?.image?.data?.attributes?.url} 1000w
                        `}
                        sizes="(max-width: 600px) 80vw, (max-width: 1024px) 60vw, 1000px"
                        onClick={() => navigate(`/item/${item.id}`)}
                        style={{cursor: "pointer"}}
                        loading="lazy"
                    />
                </LazyLoad>
            )}
          <Box
              display={isHovered ? "block" : "none"}
              position="absolute"
              bottom="10%"
              left="0"
              width="100%"
              padding="0 5%"
          >
            <Box>
                <Button
                    onClick={handleClick}
                    sx={{ backgroundColor: shades.primary[300], color: "white" }}
                >
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </Button>
            </Box>
          </Box>
        </Box>

        <Box mt="3px">
          <Typography variant="subtitle2" color={shades.secondary[500]}>
            {category}
          </Typography>
          <Typography>{name}</Typography>
          <Typography fontWeight="bold">€{price}</Typography>
        </Box>
      </Box>
  );
};

export default Item;
