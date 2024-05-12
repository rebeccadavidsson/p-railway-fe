import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isCartOpen = useSelector((state) => state.isCartOpen);

  const totalPrice = cart?.reduce((total, item) => {
    return total + 1 * item.attributes.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        backgroundColor="white"
        className={'max-w-full sm:max-w-screen-sm w-full sm:w-2/4 lg:w-1/3'}
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">JOUW LIJST ({cart?.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart?.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                <FlexBox p="15px 0" className={'gap-5 items-baseline flex-col sm:flex-row'}>
                  <Box className={'self-baseline mt-2'}>
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={item?.attributes?.image?.data?.attributes?.formats?.medium?.url}
                    />
                  </Box>
                  <Box flex="1 1 60%" className={'w-full'}>
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.description}</Typography>
                    <FlexBox m="15px 0">
                      <Typography fontWeight="bold">
                        €{item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          <Box className="mt-4">
            <p className="text-gray-700 font-bolt">
              <CheckCircleIcon className={'mr-0.5'} /> Elk schilderij wordt geleverd met een lijst. De lijst is zorgvuldig geselecteerd in combinatie met het schilderij en
              en is inbegrepen in de prijs.
              Als je een schilderij wilt kopen zonder lijst of met een andere lijst, neem dan contact met mij op voor de prijs.
            </p>

            <p className="text-gray-700 mt-4">
              <CheckCircleIcon className={'mr-0.5'} /> Bestellingen worden binnen 10 dagen geleverd. Het is ook mogelijk om het/de schilderij(en) in Utrecht op te halen. Neem voor meer informatie <Link onClick={() => dispatch(setIsCartOpen({}))} to="/about" className="text-blue-500 hover:underline"> contact</Link> met mij op.
            </p>
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">TOTAAL</Typography>
              <Typography fontWeight="bold">€{totalPrice}</Typography>
            </FlexBox>
            <Button
                sx={{
                  backgroundColor: shades.primary[400],
                  color: "white",
                borderRadius: 0,
                width: "100%",
                padding: "20px 40px",
                m: "20px 0",
                ':hover': {
                  backgroundColor: 'neutral.dark',
                  color: 'white',
                },
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              BESTELLEN
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
