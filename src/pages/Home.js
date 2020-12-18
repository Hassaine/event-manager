import React, { useEffect, useState } from 'react';
import Footer from '../components/static/Footer';
import Navbar from '../components/static/Navbar';

function Home() {
  return (
    <div className="home">
      <Navbar></Navbar>

      <Footer />
    </div>
  );
}

export default Home;
