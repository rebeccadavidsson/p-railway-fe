import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import {
  ShoppingBagOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpenMenu(open);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="white"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
            onClick={() => navigate("/")}
            sx={{"&:hover": {cursor: "pointer"}}}
            color={shades.secondary[500]}
        >
          <img alt={'logo'} src={'/logo.png'} className={'w-20'}/>
        </Box>
        <Box
            display="flex"
            justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined onClick={toggleDrawer(true)} />
          </IconButton>
          <Drawer anchor="right" open={openMenu} onClose={toggleDrawer(false)}>
            <List>
              {[
                { text: 'Home', link: '/home' },
                { text: 'About Me', link: '/about' },
                { text: 'Terms & Conditions', link: '/terms-and-conditions' },
                { text: 'Privacy Policy', link: '/privacy' }
              ].map(({ text, link }, index) => (
                  <ListItem button key={text} component="a" href={link} onClick={toggleDrawer(false)}>
                    <ListItemText primary={text} />
                  </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
