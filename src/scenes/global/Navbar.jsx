import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import {
  ShoppingBagOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import { useState } from 'react';

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpenMenu(open);
  };

  const handleSetIsCartOpen = () => {
    dispatch(setIsCartOpen({}));
  }

  return (
    <Box
      className={'max-w-4xl m-auto mt-0 mb-0 w-full pl-4 pr-4'}
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor={shades.neutral[100]}
      color="black"
      zIndex="1"
    >
      <Box
        width="100%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
            sx={{"&:hover": {cursor: "pointer"}}}
            color={shades.secondary[500]}
        >
          <Link to="/">
            <img alt={'logo'} src={'/logo.png'} className={'w-20'}/>
          </Link>
        </Box>
        <Box
            display="flex"
            justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <Badge
            badgeContent={cart?.length}
            color="secondary"
            invisible={cart?.length === 0}
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
              onClick={handleSetIsCartOpen}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }} onClick={toggleDrawer(true)}>
            <MenuOutlined />
          </IconButton>
          <Drawer
              anchor="right"
              open={openMenu}
              onClose={toggleDrawer(false)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: {
                    xs: '70%',
                    sm: '40%',
                    md: '30%',
                  },
                },
              }}
          >
            <List>
              {[
                { text: 'Home', link: '/' },
                { text: 'About Me', link: '/about' },
                { text: 'Terms & Conditions', link: '/terms-and-conditions' },
                { text: 'Privacy Policy', link: '/privacy' }
              ].map(({ text, link }) => (
                  <ListItem key={text} component="a" href={link} onClick={toggleDrawer(false)}>
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
