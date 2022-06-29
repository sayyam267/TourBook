import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Box, Grid, Card, Link, Avatar, IconButton, Typography,Stack,CardHeader,Button,Table,TableContainer,TableRow, TableCell,TableBody,TableHead } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import InputStyle from '../../components/InputStyle';
import SocialsButton from '../../components/SocialsButton';
import SearchNotFound from '../../components/SearchNotFound';
import axios from '../../utils/axios'
import VendorRequestCard from '../../sections/@dashboard/general/e-commerce/VendorRequestCard';
import RefundRequestTable from '../../sections/@dashboard/general/e-commerce/RefundRequestTable';
import { SkeletonProductItem } from '../../components/skeleton';
import Scrollbar from '../../components/Scrollbar';
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
      setRefundRequest(res.data.data.refundRequests);
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
      setRefundRequest(res.data.data.refundRequests);
    }).catch(err => console.log(err))
  }

  return (
    <>
    <Typography variant="h4" sx={{ mb: 2, mt: 5 }} md={{ mb: 2, mt: 5 }} >
        YOur Requests
      </Typography>
    <Stack sx={{mt:1}} spacing={3}>
      
      <Card>
        <CardHeader title="Pending Request" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
             <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 240 }}>Names</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Email</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Seats</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Amount</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                  
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
               {order ? <>{order?.map(order => { return <VendorRequestCard name={order.name} email={order.email} amount={order.amount} seats={order.seats} _id={order._id} date={order.date} fetchRequest={fetchRequest} /> })}</> : <SkeletonProductItem />}
                
              </TableBody>
              </Table>
                </TableContainer>
                </Scrollbar>
                    </Card>



      <Card>
        <CardHeader title="Refund Request" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 240 }}>Request From</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Email</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Seats</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Amount</TableCell>
             

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {refund ? <>{refund?.map(refund => { return <RefundRequestTable name={refund.touristID.fname} amount={refund?.amount} email={refund?.touristID.email} seats={refund.seats} date={3} id={refund._id} fetchRequest={fetchRequest} /> })}</> : <SkeletonProductItem />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------
