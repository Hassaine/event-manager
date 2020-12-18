import React, { useEffect, useState } from 'react';
import Footer from '../components/static/Footer';
import Navbar from '../components/static/Navbar';
import Postcard from '../components/Postcard';
import { Grid } from '@material-ui/core';
 
function Home() {
  return (
    <div className="home">
      <Navbar />
      <Grid container 
        justify="center"
        alignItems="center"
      >
        <Grid item>
            <Postcard />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Home;
