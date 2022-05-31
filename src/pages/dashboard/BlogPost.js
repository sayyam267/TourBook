import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Box, Grid, Card, Link, Avatar, IconButton, Typography } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import InputStyle from '../../components/InputStyle';
import SocialsButton from '../../components/SocialsButton';
import SearchNotFound from '../../components/SearchNotFound';
import axios from '../../utils/axios'
import VendorRequestCard from '../../sections/@dashboard/general/e-commerce/VendorRequestCard';
import { SkeletonProductItem } from '../../components/skeleton';
// ----------------------------------------------------------------------




export default function ProfileFriends() {


  const [order, setOrder] = useState([]);
  const [refund, setRefundRequest] = useState([]);


  useEffect(() => {
    axios.get("http://tourbook-backend.herokuapp.com/vendor/dashboard", {
      headers: {
        'x-auth-token': localStorage.getItem('accessToken'),
      }
    }).then(res => {
      console.log(res);
      setOrder(res.data.data.reservationRequests);
      // setRefundRequest(res.data.data.refundRequests);
    }).catch(err => console.log(err))
  }, []);

  const fetchRequest = () => {
    axios.get("http://tourbook-backend.herokuapp.com/vendor/dashboard", {
      headers: {
        'x-auth-token': localStorage.getItem('accessToken'),
      }
    }).then(res => {
      console.log(res);
      setOrder(res.data.data.reservationRequests);
      // setRefundRequest(res.data.data.refundRequests);
    }).catch(err => console.log(err))
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2, mt: 5 }} md={{ mb: 2, mt: 5 }} >
        Pending Request
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={6}>
          {order ? <>{order?.map(order => { return <VendorRequestCard name={order.name} email={order.email} amount={order.amount} seats={order.seats} _id={order._id} date={order.date} fetchRequest={fetchRequest} /> })}</> : <SkeletonProductItem />}
        </Grid>
      </Grid>


      <Typography variant="h4" sx={{ mb: 2, mt: 5 }} md={{ mb: 2, mt: 5 }} >
        Refund Request
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={6}>
          {refund ? <>{refund?.map(refud => { return <VendorRequestCard name={order.touristID.fname} email="Tour Reservation for 3 seats" title={"Approve Request"} button1="Don't Verify" button2="Verify" /> })}</> : <SkeletonProductItem />}
        </Grid>
      </Grid>



    </Box>
  );
}

// ----------------------------------------------------------------------
