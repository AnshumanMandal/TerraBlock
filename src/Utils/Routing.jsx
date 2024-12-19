import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "../Components/Fixed_Components/Navbar";
import Explore from "../Components/Explore";
import About from "../Components/Home/About";
import NotFound from "../Components/NotFound";
import Landing from "../Components/Home/Landing";
import Footer from "../Components/Home/Footer";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;