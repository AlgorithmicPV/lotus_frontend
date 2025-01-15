import { useState, useEffect } from "react";
import Navbar from "./components/nav";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ChatPage from "./pages/chat";
import Currencypage from "./pages/currency";
import TranslatorPage from "./pages/translator";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
      <>
        <div
          className={
            location.pathname === "/home" || location.pathname === "/"
              ? "full-cont"
              : "container"
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/lotus-chat" element={<ChatPage />} />
              <Route path="/currency-converter" element={<Currencypage />} />
              <Route path="/translator" element={<TranslatorPage />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Navbar />
      </>
    </>
  );
}

export default App;
