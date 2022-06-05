import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// _mock_
import { _bookings } from '../../../../_mock';
//
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function TouristTourDetails(props) {
  const theme = useTheme();

  console.log(props.tours);
  const tour = props.tours;
  // setTours(tours);

  const isLight = theme.palette.mode === 'light';

  return (
    <>
      <Card>
        <CardHeader title="All Tours" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 240 }}>Tour Name</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Amount</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Seats</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Refund</TableCell>
                  
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {tour?.map((tour) => (
                  <TableRow key={tour.tourID._id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">
                          {tour.tourID.name} 
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">{tour.amount}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">{tour.seats}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">{tour.createdAt}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Label variant={isLight ? 'ghost' : 'filled'} color={tour.isApproved ? 'success' : 'error'}>
                        {sentenceCase(tour.isApproved ? 'Approved':'Pending' )}
                      </Label>
                    </TableCell>
                    <TableCell>
                      <Label variant={isLight ? 'ghost' : 'filled'} color={tour.isRefunded ? 'success' : 'error'}>
                        {sentenceCase(tour.isRefunded ? 'Yes' : 'No')}
                      </Label>
                    </TableCell>

                    
                    

                    <TableCell align="right">
                      <MoreMenuButton id={tour._id}  />
                    </TableCell>
                  </TableRow>
                ))}
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
    </>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton(props) {
  const [open, setOpen] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleBlock = () => {
    axios
      .put(
        'http://localhost:4000/admin/user/block',
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
        'http://tourbook-backend.herokuapp.com/order/request/refund/',
        { orderID: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        enqueueSnackbar('Request Sent!');
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

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
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

        {/* <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} /> */}
      </MenuPopover>
    </>
  );
}
