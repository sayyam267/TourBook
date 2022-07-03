// @mui
import { styled } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import { sentenceCase } from 'change-case';
import {
  Box, Grid, Container, Typography, Button,
  Card,
  Stack,
  Table,
  Avatar,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  TableContainer,
} from '@mui/material';

// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
// sections
import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../../sections/payment';


import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
import axios from '../../utils/axios';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const ICON = {
  mr: 2,
  width: 20,
  height: 20,
};

// ----------------------------------------------------------------------

export default function Payment({ user }) {
  const isDesktop = useResponsive('up', 'md');
  const [url, setUrl] = useState(null);


  const [transactions, setTransactions] = useState();
  useEffect(async () => {
    await axios
      .get(process.env.REACT_APP_MYORDER, {
        headers: { 'x-auth-token': localStorage.getItem('accessToken') },
      })
      .then((response) => { console.log(response.data); setTransactions(response.data); });

  }, []);

  const handleUrl = (url) => {
    setUrl(url);
    console.log("hello", url);
  }
  return (
    <Page title="Payment">
      <RootStyle>
        <Container>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" align="center" paragraph>
              Let's Top Up your Wallet!
            </Typography>
            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Buy TourBook Credits from here.
            </Typography>
          </Box>

          <Grid container spacing={isDesktop ? 3 : 5}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'grid',
                  p: { md: 3 },
                  borderRadius: 2,

                }}
              >
                <PaymentBillingAddress onGetSuccess={handleUrl} />
              </Box>
            </Grid>
            {url ? <Grid item xs={12} md={6}>
              <PaymentSummary url={url} />
            </Grid> : <><Grid item xs={12} md={6}>
              <Box display="flex"
                alignItems="center"
                justifyContent="center"><Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  Nothing To Show
                </Typography></Box>
            </Grid> </>}
          </Grid>

          <Card>
            <CardHeader title="Transactions History" sx={{ mb: 3 }} />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 720 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 240 }}>Transaction</TableCell>
                      <TableCell sx={{ minWidth: 120 }}>Amount</TableCell>
                      <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                      <TableCell sx={{ minWidth: 120 }}>Status</TableCell>


                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions?.length > 0 ? transactions?.map((tour) => (
                      <TableRow key={transactions?._id}>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2">
                              {transactions?.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2">{transactions?.amount}</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2">{transactions?.status}</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2">{transactions?.createdAt}</Typography>
                          </Stack>
                        </TableCell>

                        {/* <TableCell>
                          <Label variant={'ghost'} color={transactions?.isApproved ? 'success' : 'error'}>
                            {sentenceCase(tour.isApproved ? 'Approved' : 'Pending')}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Label variant={'ghost'} color={transactions?.isRefunded ? 'success' : 'error'}>
                            {sentenceCase(transactions?.isRefunded ? 'Yes' : 'No')}
                          </Label>
                        </TableCell> */}




                        <TableCell align="right">
                          <MoreMenuButton id={transactions._id}  />
                        </TableCell>

                      </TableRow>


                    )) : <><TableRow><TableCell align="center" colSpan={6}> No Tour</TableCell></TableRow> </>}

                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Divider />

            <Box sx={{ p: 2, textAlign: 'right' }}>
              <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                View All
              </Button>
            </Box>
          </Card>


        </Container>
      </RootStyle>
    </Page>
  );
}

function MoreMenuButton(props) {
  const [open, setOpen] = useState(null);


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleBlock = () => {
    axios
      .put(
        process.env.REACT_APP_BLOCKUSER,
        { id: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {

        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleRequest = () => {
    console.log(props.id);
    axios
      .put(
        process.env.REACT_APP_ORDERREFUND,
        { orderID: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        setOpen(false);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClose = () => {
    setOpen(null);
  };



  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={handleRequest}>
          <Iconify icon={'eva:unlock-outline'} sx={{ ...ICON }} />
          Request Refund
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={props.handleDetailsOpen} >
          <Iconify icon={'clarity:details-line'} sx={{ ...ICON }} />
          Details
        </MenuItem>
      </MenuPopover>
    </>
  );
}

