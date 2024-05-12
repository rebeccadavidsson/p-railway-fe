import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import { Page } from './scenes/page/Page';
import SuccessPage from './scenes/checkout/SuccessPage';
import NotFound from './scenes/page/NotFound';
import { Provider } from 'react-redux';
import { persistor, store } from './state';
import { PersistGate } from 'redux-persist/integration/react';
import CancelPage from './scenes/checkout/CancelPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Navbar/>
            <ScrollToTop/>
            <Routes className="flex-grow">
              <Route path="/" element={<Home/>}/>
              <Route path="item/:itemId" element={<ItemDetails/>}/>
              <Route path="checkout" element={<Checkout/>}/>
              <Route path="checkout/success" element={<Confirmation/>}/>
              <Route path="terms-and-conditions" element={<Page id={1}/>}/>
              <Route path="privacy" element={<Page id={2}/>}/>
              <Route path="about" element={<Page id={3}/>}/>
              <Route path="shipping-and-returns" element={<Page id={4}/>}/>
              <Route path="success" element={<SuccessPage />}/>
              <Route path="cancel" element={<CancelPage />}/>
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
              <Route path="/not-found" element={<NotFound />} />
            </Routes>
            <CartMenu/>
            <Footer className="mt-auto"/>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
