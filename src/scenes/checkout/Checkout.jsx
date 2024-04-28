import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from 'react';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormSubmit = async (values, actions) => {
    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Please add items to your cart before proceeding to checkout.');
      return;
    }

    makePayment(values);
    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;

    const requestBody = {
      email: values.email,
      products: cart.map(({ id, count, attributes }) => ({
        id,
        count,
        name: attributes.name,
        image: attributes.image?.data.attributes.url,
        price: attributes.price
      })),
    };

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({data: requestBody}),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.sessionId
    });
  }

  return (
    <Box className={'md:w-1/2 max-w-4xl pl-10 pr-10'} m="100px auto">
      {errorMessage && (
          <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative"
               role="alert">
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
      )}
      <Stepper sx={{m: "20px 0"}}>
        <Step>
          <StepLabel>Contact Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Payment
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />

              <Box display="flex" justifyContent="space-between" gap="50px">
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  Next
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  email: "",
  phoneNumber: "",
};

const checkoutSchema = yup.object().shape({
  email: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
})

export default Checkout;
