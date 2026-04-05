import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
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

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

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
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kob" element={<Kob />} />
          <Route path="/køb" element={<Navigate to="/kob" replace />} />
          <Route path="/produkt/:productSlug" element={<ProductRedirect />} />

          <Route
            path="/login"
            element={
              <AppLayout>
                <Login />
              </AppLayout>
            }
          />
          <Route path="/log-pa" element={<Navigate to="/login" replace />} />

          <Route
            path="/join"
            element={
              <RequireAuth>
                <AppLayout>
                  <JoinTenant />
                </AppLayout>
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
          <Route
            path="*"
            element={
              <AppLayout>
                <NotFound />
              </AppLayout>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}
