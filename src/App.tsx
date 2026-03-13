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

function PublicLayout({ children }: { children: React.ReactNode }) {
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
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />

          <Route
            path="/home"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />

          <Route
            path="/cart"
            element={
              <PublicLayout>
                <Cart />
              </PublicLayout>
            }
          />

          <Route
            path="/kob"
            element={
              <PublicLayout>
                <Kob />
              </PublicLayout>
            }
          />

          <Route
            path="/køb"
            element={
              <PublicLayout>
                <Kob />
              </PublicLayout>
            }
          />

          <Route
            path="/produkt/:productSlug"
            element={
              <PublicLayout>
                <ProductRedirect />
              </PublicLayout>
            }
          />

          <Route
            path="/login"
            element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            }
          />

          <Route
            path="/log-pa"
            element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            }
          />

          <Route
            path="/join"
            element={
              <RequireAuth>
                <PublicLayout>
                  <JoinTenant />
                </PublicLayout>
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

          <Route
            path="/om-os"
            element={
              <PublicLayout>
                <OmOs />
              </PublicLayout>
            }
          />

          <Route
            path="/kontakt"
            element={
              <PublicLayout>
                <Kontakt />
              </PublicLayout>
            }
          />

          <Route
            path="/tjenester"
            element={
              <PublicLayout>
                <Tjenester />
              </PublicLayout>
            }
          />

          <Route
            path="/tjenester/:serviceSlug"
            element={
              <PublicLayout>
                <ServiceCategory />
              </PublicLayout>
            }
          />

          <Route
            path="/hvordan-fungerer"
            element={
              <PublicLayout>
                <HvordanFungerer />
              </PublicLayout>
            }
          />

          <Route
            path="/arbejdsgalleri"
            element={
              <PublicLayout>
                <Arbejdsgalleri />
              </PublicLayout>
            }
          />

          <Route
            path="/info"
            element={
              <PublicLayout>
                <Info />
              </PublicLayout>
            }
          />

          <Route
            path="/juridisk"
            element={
              <PublicLayout>
                <JuridiskInfo />
              </PublicLayout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
