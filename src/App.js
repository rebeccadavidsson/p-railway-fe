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
      <BrowserRouter>
        <Navbar/>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="item/:itemId" element={<ItemDetails/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="checkout/success" element={<Confirmation/>}/>
          <Route path="terms-and-conditions" element={<Page id={1}/>}/>
          <Route path="privacy" element={<Page id={2}/>}/>
          <Route path="about" element={<Page id={3}/>}/>
        </Routes>
        <CartMenu/>
        <Footer className="mt-auto"/>
      </BrowserRouter>
    </div>
  );
}

export default App;
