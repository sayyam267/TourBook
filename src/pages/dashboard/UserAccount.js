import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { useSnackbar } from 'notistack';


// @mui
import { useTheme, styled } from '@mui/material/styles';
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
  Grid,
  Stack,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';


import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import { fDateTime } from '../../utils/formatTime';
// utils
import { fCurrency } from '../../utils/formatNumber';

// _mock
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import axios from '../../utils/axios';


// ----------------------------------------------------------------------
const ICON = {
  mr: 2,
  width: 20,
  height: 20,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon={'mdi:close'} width={20} height={20} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function BankingRecentTransitions() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';
  const [myCustomTours, setCustomTours] = useState(null);

  const [offer,setOffer]= useState();
  const [reqId,setReqId] = useState();

  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [detailOpen, setDetailOpen] = useState(false);

  const [details,setDetails] = useState();

  const handleDetailsOpen = (tour) => {
    setDetails(tour);
    setDetailOpen(true);
    console.log(tour);
  };

  const handleDetailsClose = () => {
    setDetailOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleAcceptOffer =(reqId,vendorId,Amount) =>{

    console.log(reqId,vendorId,);
    
    axios
      .post(
        process.env.REACT_APP_CUSTOMTOUR_ACCEPTOFFER,
        { requestID:reqId,vendorID:vendorId},
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar('Offer Accepted!');
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleRejectOffer = (reqId, vendorId) => {

    console.log(reqId, vendorId);

    axios
      .post(
        process.env.REACT_APP_CUSTOMTOUR_REJECTOFFER,
        { reqId, vendorId },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar('Offer Reject!');
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    axios
     
      .get(process.env.REACT_APP_MYCUSTOMTOUR, {
        headers: { 'x-auth-token': localStorage.getItem('accessToken') },
      })
      .then((response) => {
        console.log("my Custom tour",response.data.data);
        setCustomTours(response.data.data);
      }).catch((err) => {console.log(err)});
  }, []);
  return (
    <>
      <Card>
        <CardHeader title="My Custom Tour Request" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Budget</TableCell>
                  <TableCell>Seats</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Offers</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {myCustomTours ? ( myCustomTours?.map((row) => (
                  <TableRow key={row?.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {row.requirements.description}
                      </Typography>
                    </TableCell>
                    {/* {format(new Date(row.startDate), 'dd MMM yyyy')} */}
                    <TableCell>
                      {/* <Typography variant="subtitle2">{row?.date}</Typography> */}
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {fDateTime(row?.createdAt)} 
                      </Typography>
                    </TableCell>

                    <TableCell>{row.requirements.maxBudget}RS</TableCell>
                    <TableCell>{row.requirements.seats}</TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={(row?.fulfilledBy === null && 'warning') || 'success'}
                      >
                        {sentenceCase(row?.fulfilledBy == null ? 'Pending' : `Accepted by ${row?.fulfilledBy.fname}`)}
                      </Label>
                    </TableCell>

                    <TableCell>{row.offers.length >=1 ? <Button onClick={() => { handleClickOpen(); setOffer(row.offers); setReqId(row._id) }}>See offers</Button> : "No offer yet"}</TableCell>

                    <TableCell align="right">
                      <MoreMenuButton handleDetailsOpen={handleDetailsOpen} tour={row}/>
                    </TableCell>
                  </TableRow>
                ))):<><TableRow><TableCell align="center" colSpan={6}> No Tours Found</TableCell></TableRow></>}
                
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
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          maxWidth={"md"}
          aria-labelledby="responsive-dialog-title"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Your Offers
          </BootstrapDialogTitle>
          <Divider variant="middle" />
          
          <Grid container spacing={1} sx={{width:'30vw'}}>
            {offer?.map((offer) => (
              <>
              <Stack spacing={1} sx={{m:3,pl:3}}>
                  <DialogContentText >
                    Amount Offered : {offer.amount}
                  </DialogContentText>
                  <DialogContentText>
                    Description {offer.description}
                  </DialogContentText>
                  <Divider variant="middle" />
                </Stack>
                  <Button autoFocus variant="primary" onClick={()=> handleRejectOffer()}>
                    Disagree
                  </Button>
                  <Button onClick={()=> handleAcceptOffer(reqId,offer.vendorID,offer.amount)} autoFocus>
                    Agree
                  </Button>
                
              </>
            ))}
            
          </Grid>
          
        </Dialog>
      </div>

      <Dialog
        fullScreen
        open={detailOpen}
        onClose={handleDetailsClose}
      // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDetailsClose}
              aria-label="close"
            >
              <Iconify icon={'ep:close-bold'} sx={{ ...ICON }} />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
             Custom Tour Details
            </Typography>
           
          </Toolbar>
        </AppBar>
        <List>
          <ListItem >
            <ListItemText primary={`Tour Description: ${details?.requirements.description}`}/>
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemText
              primary={`Your Expected Budget: ${details?.requirements.maxBudget}`}
            />
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemText
              primary={`Seats : ${details?.requirements.seats}`}
            />
          </ListItem>

          <Divider />
          <div style={{marginLeft:4}}>
          <div>
          Accepted By : 
            <Label
              variant={isLight ? 'ghost' : 'filled'}
              color={(details?.fulfilledBy === null && 'warning') || 'success'}
              style={{marginLeft:5}}
           
            >
            {sentenceCase(details?.fulfilledBy == null ? 'Pending' : `Accepted by ${details?.fulfilledBy.fname}`)}
            </Label>
            
            </div>
            {details?.fulfilledBy != null ? (<>
              <div>
              Name : {details?.fulfilledBy?.fname} {details?.fulfilledBy?.lname}
            </div>
            <div>
              Email : {details?.fulfilledBy?.email}
            </div>
            <div>
              Agreed Amount : {details?.agreedAmount}
              </div></>):<></>
            }
          </div>
          <Divider />
          <ListItem >
          <div>
          Offers : 
              {details?.offers.length >= 1 ? <Button style={{ marginLeft: 5 }} onClick={() => { handleClickOpen(); setOffer(details?.offers); setReqId(details?._id) }}>See offers</Button> : <span style={{ marginLeft: 5 }}>No offer yet</span>}
            </div>
          </ListItem>

        </List>
      </Dialog>
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
        

      
        <MenuItem onClick={() => props.handleDetailsOpen(props.tour)} >
          <Iconify icon={'clarity:details-line'} sx={{ ...ICON }} />
          Details
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
        
      </MenuPopover>
    </>
  );
}

