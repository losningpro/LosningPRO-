import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Market */}
        <Route path="/kob" element={<Kob />} />
        <Route path="/kob/:id" element={<Kob />} />

        {/* Services */}
        <Route path="/tjenester" element={<Tjenester />} />
        <Route path="/tjenester/:serviceSlug" element={<ServiceCategory />} />

        {/* Other pages */}
        <Route path="/hvordan-fungerer" element={<HvordanFungerer />} />
        <Route path="/om-os" element={<OmOs />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/cart" element={<Cart />} />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
