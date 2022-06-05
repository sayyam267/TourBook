import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';

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
  Icon,
} from '@mui/material';
// _mock_
import { _bookings } from '../../_mock';
//
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

export default function PendingApprovalTable(props) {
  const theme = useTheme();

  console.log(props.user);
  //   const users = props.user;

  const isLight = theme.palette.mode === 'light';
  const [users, setUsers] = useState(props.user);

  // const Users = [{
  //   id: '403949230492340',
  //   name: 'Sayyam',
  //   phoneNumber:'00034234324',
  //   status: 'Verified',
  //   role:'tourguide'
  // }, {
  //     id: '403949230492340',
  //     name: 'Komail',
  //     phoneNumber: '00034234324',
  //     status: 'Verified',
  //     role:'tourguide'
  //   }, {
  //     id: '403949230492340',
  //     name: 'Ali',
  //     phoneNumber: '00034234324',
  //     status: 'Verified',
  //     role: 'TravelAgent'
  //   }, {
  //     id: '403949230492340',
  //     name: 'Zain',
  //     phoneNumber: '00034234324',
  //     status: 'notVerify',
  //     role: 'TravelAgent'
  //   }];
  const getformattedDate = (data) => {
    const date = new Date(data);
    console.log(date);
    return <Typography>{date}</Typography>;
  };

  return (
    <>
      <Card style={{ marginTop: 15 }}>
        <CardHeader title="Pending Signup Requests" sx={{ mb: 3 }} />
        <Scrollbar>
          {/* <TableContainer sx={{ minWidth: 720 }}> */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 140 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Email</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Account Status</TableCell>
                  {/* <TableCell sx={{ minWidth: 120 }}>PhoneNo</TableCell> */}
                  <TableCell sx={{ minWidth: 120 }}>UserType</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Date Created</TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">
                          {user.fname} {user.lname}
                        </Typography>
                      </Stack>
                    </TableCell>

                    {/* <TableCell>
                      <Label variant={isLight ? 'ghost' : 'filled'} color={user.isVerified ? 'success' : 'error'}>
                        {sentenceCase(String(user.isVerified))}
                      </Label>
                    </TableCell> */}
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Label variant={isLight ? 'ghost' : 'filled'} color={'warning'}>
                        {sentenceCase('Pending')}
                      </Label>
                    </TableCell>

                    {/* <TableCell>{user.phoneNumber}</TableCell> */}
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">
                          {String(user.userType.charAt(0).toUpperCase() + user.userType.slice(1))}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {/* {getformattedDate(user.createdAt)} */}
                        {user.createdAt}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <MoreMenuButton key={user._id} id={user._id} isActive={user.isActive} />
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

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const [block, setBlock] = useState(!props.isActive);
  const handleAccept = () => {
    console.log(props.id);

    axios
      .put(
        'http://tourbook-backend.herokuapp.com/admin/user/accept/',
        { vendorID: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleReject = () => {
    console.log(props.id);
    axios
      .put(
        'http://tourbook-backend.herokuapp.com/admin/user/reject/',
        { vendorID: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
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
        // arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {/* {block ? ( */}
        <MenuItem onClick={() => handleAccept()}>
          {/* <Iconify icon={'eva:unlock-outline'} sx={{ ...ICON }} /> */}
          <Iconify icon="ant-design:check-circle-outlined" color="green" sx={{ ...ICON }} />
          Accept Request
        </MenuItem>
        <MenuItem onClick={() => handleReject()}>
          {/* <Iconify icon={'eva:unlock-outline'} sx={{ ...ICON }} /> */}
          <Iconify icon="ant-design:close-circle-outlined" color="red" sx={{ ...ICON }} />
          Reject Request
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
