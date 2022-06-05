import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Box, Grid, Card, Link, Avatar, IconButton, Typography, InputAdornment } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import InputStyle from '../../components/InputStyle';
import SocialsButton from '../../components/SocialsButton';
import SearchNotFound from '../../components/SearchNotFound';

import { BookingCustomerReviews, TouristTourDetails } from '../../sections/@dashboard/general/booking';
import axios from '../../utils/axios';
// import {
//     EcommerceCurrentBalance,
// } from '../../e-commerce/';
// ----------------------------------------------------------------------

export default function ProfileFriends() {

  const [tour,setTour] = useState();
  useEffect(async () => {
    await axios
      .get('http://tourbook-backend.herokuapp.com/order/mine', {
        headers: { 'x-auth-token': localStorage.getItem('accessToken') },
      })
      .then((response) => { console.log(response.data); setTour(response.data);  });
      
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Reserved Tour
      </Typography>
      {tour ? <TouristTourDetails tours={tour} />: <h2>Loading</h2>}
    </Box>
  );
}

// ----------------------------------------------------------------------
