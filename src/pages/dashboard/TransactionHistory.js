// @mui
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
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

export default function TransactionHistory() {
  const isDesktop = useResponsive('up', 'md');
  const [url, setUrl] = useState(null);

  const [transactions, setTransactions] = useState();
  useEffect(async () => {
    await axios
      .get(process.env.REACT_APP_TRANSACTION_MY, {
        headers: { 'x-auth-token': localStorage.getItem('accessToken') },
      })
      .then((response) => {
        console.log(response.data);
        setTransactions(response.data.data);
      });
  }, []);

  const handleUrl = (url) => {
    setUrl(url);
    console.log('hello', url);
  };
  return (
    <Page title="Payment">
      <RootStyle>
        <Container>
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
                    {transactions?.length > 0 ? (
                      transactions?.map((transaction) => (
                        <TableRow key={transaction?._id}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">{`Purchased ${transaction?.RechargedAmount} TourBook Credits`}</Typography>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">{transaction?.RechargedAmount}</Typography>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">{`${new Date(
                                transaction?.TransDate
                              ).getDate()}-${new Date(transaction?.TransDate).getMonth()}-${new Date(
                                transaction?.TransDate
                              ).getUTCFullYear()}`}</Typography>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">
                                {transaction?.refunded ? 'Refunded' : 'Purchased'}
                              </Typography>
                            </Stack>
                          </TableCell>

                       

                          <TableCell align="right">
                            <MoreMenuButton id={transaction._id} />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <>
                        <TableRow>
                          <TableCell align="center" colSpan={6}>
                            {' '}
                            No Transactions
                          </TableCell>
                        </TableRow>{' '}
                      </>
                    )}
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
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={props.handleDetailsOpen}>
          <Iconify icon={'clarity:details-line'} sx={{ ...ICON }} />
          Details
        </MenuItem>
      </MenuPopover>
    </>
  );
}
