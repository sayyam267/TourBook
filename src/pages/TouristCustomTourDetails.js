import sum from 'lodash/sum';
// @mui
import { Link as RouterLink, useLocation,useNavigate } from 'react-router-dom';
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
    Button,
} from '@mui/material';
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

export default function ToursitCustomTourDetails() {
    const { themeStretch } = useSettings();

    const location = useLocation();
    const navigate = useNavigate();
    const data = location?.state?.tour;
    console.log(location?.state?.tour);
    const { enqueueSnackbar } = useSnackbar();

    const handleChat = () => {
        
        navigate(`${PATH_DASHBOARD.chat.root}/`, { state: { id: data?.fulfilledBy?._id } });
    }

    const handleOfferChat = (ID) => {
        console.log(ID);
        navigate(`${PATH_DASHBOARD.chat.root}/`, { state: { id: ID } });
    }

    const handleAcceptOffer = (reqId, vendorId) => {

        console.log(reqId, vendorId,);

        axios
            .post(
                process.env.REACT_APP_CUSTOMTOUR_ACCEPTOFFER,
                { requestID: reqId, vendorID: vendorId },
                { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
            )
            .then((res) => {
                console.log(res.data);
                enqueueSnackbar('Offer Accepted!');
                navigate(PATH_DASHBOARD.user.account);
                
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
                navigate(PATH_DASHBOARD.user.account);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    


    return (
        <Page title="Ecommerce: Invoice">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Button
                    size="small"
                    component={RouterLink}
                    to={PATH_DASHBOARD.user.account}
                    startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
                    sx={{ mb: 3 }}
                >
                    Back
                </Button>


                <Card sx={{ pt: 5, px: 5 }}>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography variant="h6">{data?.tourID?.name}Your Custom tour Details</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Box sx={{ textAlign: { sm: 'right' } }}>
                               
                                {data?.fulfilledBy ?<> <Button
                                    variant="contained"
                                    color="warning"
                                    size="medium"
                                    onClick={() => { localStorage.setItem("VendorID", data?.fulfilledBy?._id); navigate(PATH_DASHBOARD.details.vendor) }}
                                    startIcon={<Iconify icon={'icomoon-free:profile'} />}
                                >see {data?.fulfilledBy?.fname} Profile
                                </Button><Button sx={{ml:3}}color="primary" size="medium" variant="contained" onClick={handleChat} startIcon={<Iconify icon={'bi:chat-fill'} />}>
                                    Chat with {data?.fulfilledBy?.fname}
                                    </Button></> :<></>}

                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                                Tour Created By
                            </Typography>
                            <Typography variant="body2">{data?.by.fname}</Typography>
                            <Typography variant="body2">{data?.by.email}</Typography>

                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                               Expected Dates
                            </Typography>
                            <Typography variant="body2">Start Date: {`${new Date(data?.createdAt).getDate()} - ${new Date(data?.createdAt).getMonth() + 1} - ${new Date(
                                data?.createdAt
                            ).getFullYear()}`}</Typography>
                            <Typography variant="body2">End Date: {`${new Date(data?.requirements?.endDate).getDate()} - ${new Date(data?.requirements?.endDate).getMonth() + 1} - ${new Date(
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
                                                {data?.requirements?.places?.map((place) =>{
                                                    return <span style={{marginLeft:3}}><Label>{place}</Label></span>
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

                                {data.offers.length >= 1 ?<><TableHead
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
                                        <TableCell align="left">Accept Offer</TableCell>
                                        <TableCell align="left">Reject Offer</TableCell>
                                        <TableCell align="left">Chat with Vendor</TableCell>

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
                                                <Button color="warning" size="medium" variant="contained" onClick={() => handleAcceptOffer(data?._id, offer?.vendorID)} startIcon={<Iconify icon={'charm:circle-tick'} />}>
                                                    Accept
                                                </Button>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Box sx={{ maxWidth: 800 }}>
                                                <Button color="error" size="medium" variant="contained" onClick={() => handleRejectOffer(data?._id, offer?.vendorID)} startIcon={<Iconify icon={'charm:circle-cross'} />}>
                                                    Reject
                                                </Button>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ maxWidth: 800 }}>
                                                <Button color="primary" size="medium" variant="contained" onClick={() => handleOfferChat(offer?.vendorID)} startIcon={<Iconify icon={'bi:chat-fill'} />}>
                                                    Chat 
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow></>
                                ))}
                                    
                                    </TableBody></>:<></>}


                               


                                {!data?.isRefunded && data?.requestRefund ? (<><TableHead
                                    sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': { backgroundColor: 'transparent' },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell width={40}>#</TableCell>
                                        <TableCell align="left">Request Refund</TableCell>

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
                                                    <Typography variant="subtitle2">You Requested for tour Refund</Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>



                                    </TableBody></>) : (<></>)}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <Divider sx={{ mt: 5 }} />


                </Card>
            </Container>
        </Page>
    );
}
