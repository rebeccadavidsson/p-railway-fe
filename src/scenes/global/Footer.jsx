import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
import { Link } from "react-router-dom";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box className={'sm:w-40'}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            Philip Davidsson
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About
          </Typography>
          <Link to={'about'}> <Typography mb="30px">About me</Typography></Link>
          <Link to={'terms-and-conditions'}><Typography mb="30px">Terms & Conditions</Typography></Link>
          <Link to={'privacy'}><Typography mb="30px">Privacy Policy</Typography></Link>
        </Box>

        <Box className={'max-w-full'}>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact
          </Typography>
          <Typography mb="30px" className={'break-words'}>
            KVK: 76155099
          </Typography>
          <Typography mb="30px" className={'break-words'}>
            Tel: +31 6 29391304
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: philipdavidssoncontact@gmail.com
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
