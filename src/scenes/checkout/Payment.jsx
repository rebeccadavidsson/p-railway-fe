import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contactgegevens
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Telefoonnummer"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>

      <Box className={'mt-6'}>
        <p className="text-gray-700 font-bold">
          <CheckCircleIcon className={'mr-0.5'}/> Verzendkosten zijn inbegrepen in de prijs.
        </p>

        <p className="text-gray-700 mt-4">
          <CheckCircleIcon className={'mr-0.5'}/> Elk schilderij wordt geleverd met een lijst. De lijst is zorgvuldig
          geselecteerd in combinatie met het schilderij en
          en is inbegrepen in de prijs.
          Als je een schilderij wilt kopen zonder lijst of met een andere lijst, neem dan contact met mij op voor de
          prijs.
        </p>

        <p className="text-gray-700 mt-4">
          <CheckCircleIcon className={'mr-0.5'}/> Bestellingen worden binnen 10 dagen geleverd. Het is ook mogelijk om
          het/de schilderij(en) in Utrecht op te halen. Neem voor meer informatie
          <Link to="/about" className="text-blue-500 hover:underline"> contact</Link> met
          mij op.
        </p>
      </Box>
    </Box>
  );
};

export default Payment;
