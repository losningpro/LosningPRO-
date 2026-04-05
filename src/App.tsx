import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import { RequireAuth } from "./components/requireauth";
import { CartProvider } from "./cart/cart.store";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/login";
import Konto from "./pages/konto";
import OmOs from "./pages/OmOs";
import Kontakt from "./pages/Kontakt";
import Tjenester from "./pages/Tjenester";
import HvordanFungerer from "./pages/HvordanFungerer";
import JoinTenant from "./pages/JoinTenant";
import Kob from "./pages/Kob";
import Arbejdsgalleri from "./pages/Arbejdsgalleri";
import Info from "./pages/Info";
import JuridiskInfo from "./pages/JuridiskInfo";
import ServiceCategory from "./pages/ServiceCategory";
import NotFound from "./pages/NotFound";

function ProductRedirect() {
  const { productSlug } = useParams();
  return <Navigate to={`/kob?q=${encodeURIComponent(productSlug ?? "")}`} replace />;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kob" element={<Kob />} />
          <Route path="/køb" element={<Kob />} />
          <Route path="/produkt/:productSlug" element={<ProductRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/log-pa" element={<Login />} />
          <Route
            path="/join"
            element={
              <RequireAuth>
                <JoinTenant />
              </RequireAuth>
            }
          />
          <Route
            path="/konto/*"
            element={
              <RequireAuth>
                <Konto />
              </RequireAuth>
            }
          />
          <Route path="/om-os" element={<OmOs />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/tjenester" element={<Tjenester />} />
          <Route path="/tjenester/:serviceSlug" element={<ServiceCategory />} />
          <Route path="/hvordan-fungerer" element={<HvordanFungerer />} />
          <Route path="/arbejdsgalleri" element={<Arbejdsgalleri />} />
          <Route path="/info" element={<Info />} />
          <Route path="/juridisk" element={<JuridiskInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
