import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { RequireAuth } from "./components/requireauth";

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
import ServiceCategory from "./pages/ServiceCategory";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* MARKET */}
        <Route path="/kob" element={<Kob />} />
        <Route path="/kob/:id" element={<Kob />} />

        {/* SERVICE CATEGORIES */}
        <Route path="/tjenester/:serviceSlug" element={<ServiceCategory />} />

        {/* CART */}
        <Route path="/cart" element={<Cart />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/log-pa" element={<Login />} />

        {/* AUTH */}
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

        {/* STATIC */}
        <Route path="/om-os" element={<OmOs />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/tjenester" element={<Tjenester />} />
        <Route path="/hvordan-fungerer" element={<HvordanFungerer />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}
