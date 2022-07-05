import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  IconButton,
  TableContainer,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// utils
import { fCurrency } from '../../utils/formatNumber';
// _mock
import { _bankingRecentTransitions } from '../../_mock';
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import axios from '../../utils/axios';
import { PATH_DASHBOARD, PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function BankingRecentTransitions() {
  const theme = useTheme();

  const [customTour, setCustomTour] = useState();
  const isLight = theme.palette.mode === 'light';

  const [open, setOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState();
  const [description, setDescription] = useState();
  const [approvedTour,setApprovedTour] = useState();
  const [requestID, setreqID] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const handleDialogOpen = (id) => {
    setOpen(true);
    setreqID(id);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSendOffer = () => {
    console.log(offerAmount, description, requestID);
    axios
      .post(
        process.env.REACT_APP_CUSTOMTOUR_GIVEOFFER,
        {
          requestID,
          amount:offerAmount,
          description
        },
        // { requestID, amount: offerAmount, description },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((response) => {
        handleDialogClose();

        enqueueSnackbar('Offer sent!');
        console.log(response);
        // setCustomTour(response.data.data);
      });
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GETALLCUSTOMTOUR, { headers: { 'x-auth-token': localStorage.getItem('accessToken') } })
      .then((response) => {
        console.log(response.data.data);
        setCustomTour(response.data.data);
      });
    axios
      .get(process.env.REACT_APP_GETVENDORDASHBOARD, { headers: { 'x-auth-token': localStorage.getItem('accessToken') } })
      .then((response) => {
        console.log(response.data.data?.myApprovedCustomTours);
        setApprovedTour(response.data.data?.myApprovedCustomTours);
      });
  }, []);
  return (
    <>
      <Card>
        <CardHeader title="Custom Tour Request" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Request From</TableCell>
                  <TableCell>Phone no</TableCell>
                  <TableCell>Max Budget</TableCell>
                  <TableCell>seats</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Starting from</TableCell>
                  <TableCell>Places</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {customTour ? (
                  customTour.map((ct) => (
                    <TableRow key={ct?.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ position: 'relative' }}>{renderAvatar(ct?.category, ct?.avatar)}</Box>
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2">{ct?.by.fname}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {' '}
                              {ct?.by.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">{ct?.by.phoneNumber}</Typography>
                      </TableCell>

                      <TableCell>{ct?.requirements?.maxBudget}RS</TableCell>
                      <TableCell>{ct?.requirements?.seats}</TableCell>

                      <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {ct?.requirements?.description}
                      </TableCell>

                      <TableCell>{ct?.requirements?.source?.name}</TableCell>
                      <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {ct?.requirements.places}
                      </TableCell>
                      <TableCell>{ct?.requirements?.destination?.name}</TableCell>

                      

                      <TableCell align="right">
                        <MoreMenuButton handleDialog={handleDialogOpen} tour={ct} id={ct._id} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <></>
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


      <Card>
        <CardHeader title="Approved Custom Tour" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tourist Name</TableCell>
                  <TableCell>Phone no</TableCell>
                  <TableCell>Agreed Budget</TableCell>
                  <TableCell>seats</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Starting from</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Places</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {approvedTour ? (
                  approvedTour.map((ct) => (
                    <TableRow key={ct?.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ position: 'relative' }}>{renderAvatar(ct?.category, ct?.avatar)}</Box>
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2">{ct?.by?.fname}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {' '}
                              {ct?.by?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">{ct?.by?.phoneNumber}</Typography>
                      </TableCell>

                      <TableCell>{ct?.agreedAmount}RS</TableCell>
                      <TableCell>{ct?.requirements?.seats}</TableCell>

                      <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {ct?.requirements?.description}
                      </TableCell>

                      <TableCell>{ct?.requirements?.startDate}</TableCell>
                      <TableCell>{ct?.requirements?.endDate}</TableCell>
                      <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {ct?.requirements.places}
                      </TableCell>
                     
                      <TableCell align="right">
                        <MoreMenuButton1  tour={ct} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <></>
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












      <div>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Send Custom Tour Offer to </DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter your offer amount with detail description.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Offer Amount"
              type="number"
              fullWidth
              variant="standard"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
            />
            <TextField
              margin="dense"
              id="Description"
              label="description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSendOffer}>Send Offer</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

AvatarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

function AvatarIcon({ icon }) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

function renderAvatar(category, avatar) {
  if (category === 'Books') {
    return <AvatarIcon icon={'eva:book-fill'} />;
  }
  if (category === 'Beauty & Health') {
    return <AvatarIcon icon={'eva:heart-fill'} />;
  }
  return avatar ? (
    <Avatar alt={category} src={avatar} sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }} />
  ) : null;
}

// ----------------------------------------------------------------------

function MoreMenuButton(props) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const openDialog = () => {
    console.log('hello', props.id);
    props.handleDialog(props.id);
  };
  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };
  const handleDelete = () => {
    // axios.
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
        <MenuItem onClick={openDialog}>
          <Iconify icon={'mdi:send'} rotate={3} sx={{ ...ICON }} />
          Send Offer
        </MenuItem>
        <MenuItem onClick={() => navigate(PATH_DASHBOARD.details.vcustomtour, { state: { tour: props.tour } })}>
          <Iconify icon={'clarity:details-line'} sx={{ ...ICON }} />
          Details
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}

function MoreMenuButton1(props) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    console.log(props.tour)
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
        <MenuItem onClick={() => navigate(PATH_DASHBOARD.details.vcustomtour, { state: { tour: props.tour } })}>
          <Iconify icon={'clarity:details-line'}  sx={{ ...ICON }} />
          Details
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

      </MenuPopover>
    </>
  );
}

