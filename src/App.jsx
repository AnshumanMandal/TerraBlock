import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Home/Landing';
import Explore from './Components/Explore';
import ListProperty from './Components/ListProperty';
import Navbar from './Components/Fixed_Components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen bg-[#222222]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={
          <div className="flex flex-col min-h-screen">
            <div className="mt-20 flex-1">
              <Explore />
            </div>
          </div>
        } />
        <Route path="/list" element={
          <div className="flex flex-col min-h-screen">
            <div className="mt-20 flex-1">
              <ListProperty />
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default App; 