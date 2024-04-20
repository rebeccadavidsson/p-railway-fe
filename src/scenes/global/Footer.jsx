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
        flexWrap="wrap"
        rowGap="50px"
        columnGap="50px"
        className={'md:justify-end'}
      >

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
