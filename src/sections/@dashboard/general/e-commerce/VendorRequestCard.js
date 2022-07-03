// @mui
import { styled,useTheme } from '@mui/material/styles';
import {useState} from 'react';
import { Button, Card, Typography, Stack,CardHeader,TableHead,TableBody,Table,Box,IconButton,TableContainer,Divider,TableRow,TableCell,MenuItem} from '@mui/material';
// utils
import { useSnackbar } from 'notistack';

import { sentenceCase } from 'change-case';
import { fCurrency } from '../../../../utils/formatNumber';
import axios from '../../../../utils/axios';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';


// ----------------------------------------------------------------------

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

// ----------------------------------------------------------------------

export default function VendorRequestCard({ name, email, seats, tourid, amount, _id, date, fetchRequest}) {
  // const RequestTitle = title;
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const handleReject = () => {
    axios
      .put(
        process.env.REACT_APP_ORDERACCEPT,
        { id: _id },
        {
          headers: { 'x-auth-token': localStorage.getItem('accessToken') },
        }
      )
      .then((res) => {
        fetchRequest();
        console.log(res);
      });
  };
  const handleApprove = () => {
    axios
      .put(
        process.env.REACT_APP_ORDERREJECT,
        { id: _id },
        {
          headers: { 'x-auth-token': localStorage.getItem('accessToken') },
        }
      )
      .then((res) => {
        fetchRequest();
        console.log(res);
      });
  };
  return (
    <>
                  <TableRow key={_id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">{email}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">{seats}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">{amount}</Typography>
                      </Stack>
                    </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2">{date}</Typography>
          </Stack>
        </TableCell>

                    <TableCell align="right">
                      <MoreMenuButton id={_id} fetch={fetchRequest} />
                    </TableCell>
                  </TableRow>

        <Divider />

        
    </>
  );
}

function MoreMenuButton(props) {
  const [open, setOpen] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleAccept = () => {
    axios
      .put(
        process.env.REACT_APP_ORDERACCEPT,
        { id: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        props.fetch();
        console.log(res.data);
        enqueueSnackbar('Request Accepted!');
        
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleReject = () => {
    console.log(props.id);
    axios
      .put(
        process.env.REACT_APP_ORDERREJECT,
        { id: props.id },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        props.fetch();
        console.log(res.data);
        enqueueSnackbar('Request Rejected!');
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
        <MenuItem onClick={handleAccept}>
          <Iconify icon={'eva:unlock-outline'} sx={{ ...ICON }} />
          Accept Request
        </MenuItem>

        <MenuItem onClick={handleReject}>
          <Iconify icon={'eva:unlock-outline'} sx={{ ...ICON }} />
          Reject Request
        </MenuItem>
      </MenuPopover>
    </>
  );
}














