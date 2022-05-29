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
                  <TableCell sx={{ minWidth: 240 }}>Tour Name</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>VedorName</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>amount</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Refund Request</TableCell>
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
                        <Typography variant="subtitle2">{user.userType}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="right">
                      <MoreMenuButton key={user._id} isActive={user.isActive} />
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
  const handleBlock = () => {
    axios
      .put(
        'http://localhost:4000/admin/user/block',
        { id: props._id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleunblock = () => {
    axios
      .put(
        'http://localhost:4000/admin/user/unblock',
        { id: props._id },
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
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
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





