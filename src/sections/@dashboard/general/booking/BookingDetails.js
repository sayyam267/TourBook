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

export default function BookingDetails(props) {
  const theme = useTheme();

  console.log(props.user);
  const users = props.user;

  const isLight = theme.palette.mode === 'light';

  

  return (
    <>
      <Card>
        <CardHeader title="All Users" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 140 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 140 }}>Email</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Verify</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Active</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>PhoneNo</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>UserType</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Date Created</TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <>
                  {
                    !user.isDeleted ? (<TableRow key={user._id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">
                          {user.fname} {user.lname}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">
                          {user.email}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Label variant={isLight ? 'ghost' : 'filled'} color={user.isVerified ? 'success' : 'error'}>
                        {sentenceCase(String(user.isVerified))}
                      </Label>
                    </TableCell>
                    <TableCell>
                      <Label variant={isLight ? 'ghost' : 'filled'} color={user.isActive ? 'success' : 'error'}>
                        {sentenceCase(String(user.isActive))}
                      </Label>
                    </TableCell>

                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">
                          {String(user.userType.charAt(0).toUpperCase() + user.userType.slice(1))}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell align="right">
                      <MoreMenuButton key={user._id} id={user._id} isActive={user.isActive} fetch={props.fetch} />
                    </TableCell>
                  </TableRow>):<></>
                  }
                  </>
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

  const [block, setBlock] = useState(!props.isActive);
  
  const handleBlock = () => {
    console.log(props.id);
    axios
      .put(
        process.env.REACT_APP_BLOCKUSER,
        { id: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        props.fetch();
        enqueueSnackbar('User Blocked!');
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleDelete = () => {
    // console.log(props._id);
    axios
      .put(
        process.env.REACT_APP_DELETEUSER,
        { id: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        props.fetch();
        enqueueSnackbar('User Deleted!');
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleunblock = () => {
    
    axios
      .put(
        process.env.REACT_APP_UNBLOCKUSER,
        { userID: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        props.fetch();
        enqueueSnackbar('User UnBlocked!');
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
          width: 200,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {block ? (
          <MenuItem onClick={handleunblock}>
            <Iconify icon={'eva:unlock-outline'} sx={{ ...ICON }} />
            Unblock
          </MenuItem>
        ) : (
          <MenuItem sx={{ color: 'error.main' }} onClick={handleBlock}>
            <Iconify icon={'eva:lock-outline'} sx={{ ...ICON }} />
            Block
          </MenuItem>
        )}
        <MenuItem onClick={handleDelete}>
          <Iconify icon="ant-design:delete-outlined" color="red" sx={{ ...ICON }} />
          Delete User
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

// import { useState } from 'react';
// import { format } from 'date-fns';
// import { sentenceCase } from 'change-case';

// import { useTheme } from '@mui/material/styles';
// import {
//   Box,
//   Card,
//   Stack,
//   Table,
//   Avatar,
//   Button,
//   Divider,
//   MenuItem,
//   TableRow,
//   TableBody,
//   TableCell,
//   IconButton,
//   TableHead,
//   CardHeader,
//   Typography,
//   TableContainer,
// } from '@mui/material';
// // _mock_
// import { _bookings } from '../../../../_mock';
// //
// import Label from '../../../../components/Label';
// import Iconify from '../../../../components/Iconify';
// import Scrollbar from '../../../../components/Scrollbar';
// import MenuPopover from '../../../../components/MenuPopover';

// // ----------------------------------------------------------------------

// export default function BookingDetails({user}) {
//   const theme = useTheme();

//   console.log(user);

//   const isLight = theme.palette.mode === 'light';

//   const Users = [{
//     id: '403949230492340',
//     name: 'Sayyam',
//     phoneNumber:'00034234324',
//     status: 'Verified',
//     role:'tourguide'
//   }, {
//       id: '403949230492340',
//       name: 'Komail',
//       phoneNumber: '00034234324',
//       status: 'Verified',
//       role:'tourguide'
//     }, {
//       id: '403949230492340',
//       name: 'Ali',
//       phoneNumber: '00034234324',
//       status: 'Verified',
//       role: 'TravelAgent'
//     }, {
//       id: '403949230492340',
//       name: 'Zain',
//       phoneNumber: '00034234324',
//       status: 'notVerify',
//       role: 'TravelAgent'
//     }];

//   return (
//     <>
//       <Card>
//         <CardHeader title="Vendors List" sx={{ mb: 3 }} />
//         <Scrollbar>
//           <TableContainer sx={{ minWidth: 720 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ minWidth: 240 }}>Name</TableCell>
//                   <TableCell sx={{ minWidth: 240 }}>Verify</TableCell>
//                   <TableCell sx={{ minWidth: 120 }}>PhoneNo</TableCell>
//                   <TableCell sx={{ minWidth: 200 }}>UserType</TableCell>
//                   <TableCell sx={{ minWidth: 120 }}>V-Type</TableCell>
//                   <TableCell />
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {user?.map((user) => (
//                   <TableRow key={user._id}>
//                     <TableCell>
//                       <Stack direction="row" alignItems="center" spacing={2}>
//                         <Typography variant="subtitle2">{user.fname} {user.lname}</Typography>
//                       </Stack>
//                     </TableCell>

//                     <TableCell>
//                       <Label
//                         variant={isLight ? 'ghost' : 'filled'}
//                         color={'success'}
//                       >
//                         {sentenceCase(user.isVerified)}
//                       </Label>
//                     </TableCell>

//                     <TableCell>{user.phoneNumber}</TableCell>
//                     <TableCell>
//                       <Stack direction="row" alignItems="center" spacing={2}>
//                         <Typography variant="subtitle2">{user.userType}</Typography>
//                       </Stack>
//                     </TableCell>

//                     <TableCell align="right">
//                       <MoreMenuButton />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <Divider />

//         <Box sx={{ p: 2, textAlign: 'right' }}>
//           <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
//             View All
//           </Button>
//         </Box>
//       </Card>
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// function MoreMenuButton() {
//   const [open, setOpen] = useState(null);

//   const handleOpen = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const [block, setBlock] = useState(false);

//   const handleClose = () => {
//     setOpen(null);
//   };

//   const ICON = {
//     mr: 2,
//     width: 20,
//     height: 20,
//   };

//   return (
//     <>
//       <IconButton size="large" onClick={handleOpen}>
//         <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
//       </IconButton>

//       <MenuPopover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         arrow="right-top"
//         sx={{
//           mt: -0.5,
//           width: 160,
//           '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
//         }}
//       >
//         {block ? <MenuItem>
//           <Iconify icon={'eva:unlock-outline'} sx={{ ...ICON }} />
//           Unblock
//         </MenuItem>:<MenuItem sx={{ color: 'error.main' }}>
//           <Iconify icon={'eva:lock-outline'} sx={{ ...ICON }} />
//           Block
//         </MenuItem>}

//         {/* <MenuItem>
//           <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
//           Print
//         </MenuItem>

//         <MenuItem>
//           <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
//           Share
//         </MenuItem>

//         <Divider sx={{ borderStyle: 'dashed' }} /> */}

//       </MenuPopover>
//     </>
//   );
// }
