import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { shades } from '../../theme';

function Footer() {
  return (
    <Box padding="40px 0" backgroundColor={shades.neutral[200]} className={'flex-auto'}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        flexWrap="wrap"
        rowGap="50px"
        columnGap="50px"
        className={'max-w-3xl'}
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
            Tel: +31 6 29391304
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            philipdavidssoncontact@gmail.com
          </Typography>
          <Typography mb="30px" className={'break-words'}>
            KVK: 76155099
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
