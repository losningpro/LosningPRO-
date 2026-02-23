import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './src/pages/Home';
import Kob from './src/pages/Kob';
import Tjenester from './src/pages/Tjenester';
import ServiceCategory from './src/pages/ServiceCategory';
import HvordanFungerer from './src/pages/HvordanFungerer';
import OmOs from './src/pages/OmOs';
import Arbejdsgalleri from './src/pages/Arbejdsgalleri';
import Kontakt from './src/pages/Kontakt';
import Cart from './src/pages/Cart';
import Checkout from './src/pages/Checkout';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router>
        <main className="min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kob" element={<Kob />} />
            <Route path="/tjenester" element={<Tjenester />} />
            <Route path="/tjenester/:serviceSlug" element={<ServiceCategory />} />
            <Route path="/hvordan-fungerer" element={<HvordanFungerer />} />
            <Route path="/om-os" element={<OmOs />} />
            <Route path="/arbejdsgalleri" element={<Arbejdsgalleri />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </main>
      </Router>
    </Theme>
  );
}

export default App;