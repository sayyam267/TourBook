import {useState } from 'react';
import { useNavigate } from "react-router-dom";
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
  TextField,
  Rating,
  TextareaAutosize,
} from '@mui/material';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';

import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import axios from '../../../../utils/axios';
import { RHFTextField,} from '../../../../components/hook-form';
import { PATH_DASHBOARD, PATH_AUTH } from '../../../../routes/paths';




// ----------------------------------------------------------------------

const ICON = {
  mr: 2,
  width: 20,
  height: 20,
};

export default function TouristTourDetails(props) {
  const theme = useTheme();

  console.log(props.tours);
  const tour = props.tours;
 
  

  
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDetailsOpen = () => {
    setDetailOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailOpen(false);
  };

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
                  <TableCell sx={{ minWidth: 120 }}>Seats Booked</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Refund</TableCell>
                  
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {tour?.length >0 ? tour?.map((tour) => (
                  <TableRow   key={tour.tourID._id}>
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
                        {sentenceCase(tour.isApproved ? 'Approved' : 'Pending')}
                      </Label>
                    </TableCell>
                    <TableCell>
                      <Label variant={isLight ? 'ghost' : 'filled'} color={tour.isRefunded ? 'success' : 'error'}>
                        {sentenceCase(tour.isRefunded ? 'Yes' : 'No')}
                      </Label>
                    </TableCell>




                    <TableCell align="right">
                      <MoreMenuButton id={tour._id} tour={tour} handleDetailsOpen={handleDetailsOpen} />
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
              Tour Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleDetailsClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton(props) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const [openFeedBack, setOpenFeedBack] = useState(false);
  const [feedback, setFeedBack] = useState("");
  const [rating, setRating] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseFeedBack = () => {
    setOpenFeedBack(false);
    
  };

  const handleSendFeedBack = () =>{
    console.log(feedback,rating);
    const r = rating
    axios
      .post(
        process.env.REACT_APP_ADD_RATING,
        {
          tourID: props?.tour?.tourID?.vendorID?._id,
          message: feedback,
          rating: r
        },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
      )
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar('Thanks for giving feedback!');
        handleCloseFeedBack();

      })
      .catch((e) => {
        console.log(e);
      });
    
  }

 
  const handleRequest = () => {
    console.log(props.id);
    axios
      .put(
        process.env.REACT_APP_ORDERREFUND,
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
        {props?.tour?.isApproved ?<MenuItem onClick={handleRequest}>
          <Iconify icon={'gridicons:refund'} sx={{ ...ICON }} />
          Request Refund
        </MenuItem>:<></>}
      
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => navigate(PATH_DASHBOARD.details.reservedtour, { state: { tour: props.tour } })} >
          <Iconify icon={'clarity:details-line'} sx={{ ...ICON }} />
          Details
        </MenuItem>

       {!props.tour?.tourID?.isCompleted ?<MenuItem onClick={() => setOpenFeedBack(true)} >
          <Iconify icon={'topcoat:feedback'} sx={{ ...ICON }} />
          Give FeedBack
        </MenuItem>:<></>}

      </MenuPopover>

      <div>
        <Dialog open={openFeedBack} onClose={handleClose}>
          <DialogTitle>FeedBack</DialogTitle>
          <DialogContent>
            <DialogContentText >
             Please give feedBack for this tour
            </DialogContentText>
            <br />
              
            <TextareaAutosize
            autoFocus
              aria-label="minimum height"
              minRows={6}
              placeholder="Enter FeedBack"
              style={{ width: 500}}
              value={feedback}
              onChange={(e) => setFeedBack(e.target.value)}
            />
          </DialogContent>
          <DialogTitle>Rating</DialogTitle>
          <DialogContent>
            <DialogContentText >
              Please give rating for this tour
            </DialogContentText>
          </DialogContent>
          <div style={{margin:'auto'}}><Rating name="rating" value={rating} onChange={(e) => setRating(e.target.value)} /></div>
          <DialogActions>
            <Button onClick={handleCloseFeedBack}>Cancel</Button>
            <Button onClick={handleSendFeedBack}>Send</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}


