import sum from 'lodash/sum';
// @mui
import {useState} from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
    Box,
    Grid,
    Card,
    Table,
    Divider,
    TableRow,
    Container,
    TableBody,
    TableHead,
    TableCell,
    Typography,
    TableContainer,
    Button,TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// routes
import { AdapterDateFns } from '@mui/lab/AdapterDateFns';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD, PATH_AUTH } from '../routes/paths';
// utils
import { fCurrency } from '../utils/formatNumber';
// _mock_
import { _invoice } from '../_mock';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Label from '../components/Label';

import Image from '../components/Image';
import Scrollbar from '../components/Scrollbar';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// sections
import Iconify from '../components/Iconify';
import { InvoiceToolbar } from '../sections/@dashboard/e-commerce/invoice';
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
    '& td': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

// ----------------------------------------------------------------------

export default function VendorCustomTourDetails() {
    const { themeStretch } = useSettings();

    const location = useLocation();
    const navigate = useNavigate();
    const data = location?.state?.tour;
    console.log(location?.state?.tour);

    const [open, setOpen] = useState(false);
    const [chk, setChk] = useState(false);
    const [offerAmount, setOfferAmount] = useState();
    const [description, setDescription] = useState();
    const { enqueueSnackbar } = useSnackbar();

    const handleChat = () => {
        console.log(data?.by?._id);
        navigate(`${PATH_DASHBOARD.chat.root}/`, { state: { id: data?.by?._id } });
    }

    const handleOfferChat = (ID) => {
        console.log(ID);
        navigate(`${PATH_DASHBOARD.chat.root}/`, { state: { id: ID } });
    }
    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleSendOffer = () => {
        console.log(offerAmount, description, data?._id);
        axios
            .post(
                process.env.REACT_APP_CUSTOMTOUR_GIVEOFFER,
                {
                    requestID:data?._id,
                    amount: offerAmount,
                    description
                },
                // { requestID, amount: offerAmount, description },
                { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
            )
            .then((response) => {
                handleDialogClose();
                setChk(true);
                enqueueSnackbar('Offer sent!');
                console.log(response);
                // setCustomTour(response.data.data);
            });
    };


    return (
        <Page title="Custom Tour ">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Button
                    size="small"
                    component={RouterLink}
                    to={PATH_DASHBOARD.kanban}
                    startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
                    sx={{ mb: 3 }}
                >
                    Back
                </Button>


                <Card sx={{ pt: 5, px: 5 }}>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography variant="h6">{data?.by?.fname} Custom tour Details</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Box sx={{ textAlign: { sm: 'right' }}}>
                                {!data?.fulfilledBy ? <Button color="warning" size="medium" disabled={chk} variant="contained" onClick={() => setOpen(true)} startIcon={<Iconify icon={'mdi:offer'} />}>
                                    {!chk ?'Send Offer':'Offer Sent'} to {data?.by?.fname}
                                </Button>:<></>}
                                <Button sx={{ml:2}} color="primary" size="medium" variant="contained" onClick={handleChat} startIcon={<Iconify icon={'bi:chat-fill'} />}>
                                    Chat with {data?.by?.fname}
                                </Button>
                                

                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                                Tour Request From
                            </Typography>
                            <Typography variant="body2">{data?.by.fname} {data?.by.fname}</Typography>
                            <Typography variant="body2">{data?.by.email}</Typography>

                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                                Expected Dates
                            </Typography>
                            <Typography variant="body2">Start Date: {`${new Date(data?.createdAt).getDay()} - ${new Date(data?.createdAt).getMonth() + 1} - ${new Date(
                                data?.createdAt
                            ).getFullYear()}`}</Typography>
                            <Typography variant="body2">End Date:{`${new Date(data?.requirements?.endDate).getDay()} - ${new Date(data?.requirements?.endDate).getMonth() + 1} - ${new Date(
                                data?.requirements?.endDate
                            ).getFullYear()}`}</Typography>

                        </Grid>
                    </Grid>

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 960 }}>
                            <Table>
                                <TableHead
                                    sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': { backgroundColor: 'transparent' },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell width={40}>#</TableCell>
                                        <TableCell align="left">Description</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}
                                    >
                                        <TableCell>.</TableCell>
                                        <TableCell align="left">
                                            <Box sx={{ maxWidth: 800 }}>
                                                <Typography variant="subtitle2">{data?.requirements?.description} </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>


                                </TableBody>

                                <TableHead
                                    sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': { backgroundColor: 'transparent' },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell width={40}>#</TableCell>
                                        <TableCell align="left">Max Budget</TableCell>
                                        <TableCell align="left">Seats Qty</TableCell>
                                        <TableCell align="left">Request for Guide</TableCell>
                                        <TableCell align="left">Request for Hotel</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow

                                        sx={{
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}
                                    >
                                        <TableCell>.</TableCell>
                                        <TableCell align="left">
                                            <Box sx={{ maxWidth: 560 }}>
                                                <Typography variant="subtitle2">{data?.requirements?.maxBudget} RS</Typography>

                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">{data?.requirements?.seats}</TableCell>
                                        <TableCell align="left">{data?.requirements?.isGuide ? <Typography color="primary" variant="subtitle1">yes</Typography> : <Typography color="error" variant="subtitle1">no</Typography>}</TableCell>
                                        <TableCell align="center">{data?.requirements?.isHotel ? <Typography color="primary" variant="subtitle1">yes</Typography> : <Typography color="error" variant="subtitle1">no</Typography>}</TableCell>

                                    </TableRow>

                                </TableBody>

                                <TableHead
                                    sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': { backgroundColor: 'transparent' },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell width={40}>#</TableCell>
                                        <TableCell align="left">Start Location</TableCell>
                                        <TableCell align="left">End Location Location</TableCell>
                                        <TableCell align="left">Stops or Places to visit</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}
                                    >
                                        <TableCell>.</TableCell>
                                        <TableCell align="left">
                                            <Box sx={{ maxWidth: 800 }}>
                                                <Typography variant="subtitle2">{data?.requirements?.source?.name} </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Box sx={{ maxWidth: 800 }}>
                                                <Typography variant="subtitle2">{data?.requirements?.destination?.name} </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Box sx={{ maxWidth: 800 }}>
                                                {data?.requirements?.places?.map((place) => {
                                                    return <span style={{ marginLeft: 3 }}><Label>{place}</Label></span>
                                                })}
                                            </Box>
                                        </TableCell>
                                    </TableRow>


                                </TableBody>

                                {data?.fulfilledBy ? (<><TableHead
                                    sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': { backgroundColor: 'transparent' },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell width={40}>#</TableCell>
                                        <TableCell align="left">Tour Accepted</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Agreed Amount</TableCell>


                                    </TableRow>
                                </TableHead>
                                    <TableBody>
                                        <TableRow
                                            sx={{
                                                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                            }}
                                        >
                                            <TableCell>.</TableCell>
                                            <TableCell align="left">
                                                <Box sx={{ maxWidth: 800 }}>
                                                    <Typography variant="subtitle2">Your tour has Accepted</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Box sx={{ maxWidth: 800 }}>
                                                    <Typography variant="subtitle2">{data?.fulfilledBy?.fname} {data?.fulfilledBy?.lname}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Box sx={{ maxWidth: 800 }}>
                                                    <Typography variant="subtitle2">{data?.fulfilledBy?.email}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Box sx={{ maxWidth: 800 }}>
                                                    <Typography variant="subtitle2">{data?.agreedAmount} RS</Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>



                                    </TableBody></>) : (<></>)}
{/* 
                                {data.offers.length >= 1 ? <><TableHead
                                    sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': { backgroundColor: 'transparent' },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell width={40}>#</TableCell>
                                        <TableCell width={300} align="left">Offers</TableCell>


                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">.</TableCell>
                                        <TableCell align="left">Offer Description</TableCell>
                                        <TableCell align="left">Offer Amount</TableCell>

                                    </TableRow>
                                </TableHead>
                                    <TableBody>
                                        {data?.offers?.map((offer) => (
                                            <><TableRow
                                                sx={{
                                                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                                }}
                                            >
                                                <TableCell align="left">
                                                    .
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Box sx={{ maxWidth: 800 }}>
                                                        <Typography variant="subtitle2">{offer?.description} </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Box sx={{ maxWidth: 800 }}>
                                                        <Typography variant="subtitle2">{offer?.amount}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Box sx={{ maxWidth: 800 }}>
                                                        <Button color="primary" size="medium" variant="contained" onClick={() => handleOfferChat(offer?.vendorID)} startIcon={<Iconify icon={'bi:chat-fill'} />}>
                                                            Chat with Vendor
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            </TableRow></>
                                        ))}

                                    </TableBody></> : <></>} */}





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
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <Divider sx={{ mt: 5 }} />


                </Card>
            </Container>
        </Page>
    );
}
