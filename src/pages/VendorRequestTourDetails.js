import sum from 'lodash/sum';
// @mui
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
    Button,
} from '@mui/material';
// routes
import { AdapterDateFns } from '@mui/lab/AdapterDateFns';
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


// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
    '& td': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

// ----------------------------------------------------------------------

export default function EcommerceInvoice() {
    const { themeStretch } = useSettings();

    const location = useLocation();
    const navigate = useNavigate();
    const data = location?.state?.tour;
    console.log(location?.state?.tour);

    const handleChat = () => {
        
        navigate(`${PATH_DASHBOARD.chat.root}/`, { state: { id: data?.touristID?._id } });
    }

    return (
        <Page title="Request : Details">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Button
                    size="small"
                    component={RouterLink}
                    to={PATH_DASHBOARD.user.list}
                    startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
                    sx={{ mb: 3 }}
                >
                    Back
                </Button>


                <Card sx={{ pt: 5, px: 5 }}>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography variant="h6">{data?.touristID?.fname} Refund Request Details</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Box sx={{ textAlign: { sm: 'right' } }}>
                                <Button color="primary" size="medium" variant="contained" onClick={handleChat} startIcon={<Iconify icon={'bi:chat-fill'} />}>
                                    Chat with {data?.touristID?.fname}
                                </Button>

                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                                Tourist Info
                            </Typography>
                            <Typography variant="body2">{data?.touristID?.fname} {data?.touristID?.lname}</Typography>
                            <Typography variant="body2">{data?.touristID?.email}</Typography>

                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                                Dates
                            </Typography>
                            <Typography variant="body2">Start Date: {data?.createdAt}</Typography>
                            <Typography variant="body2">End Date: {data?.date}</Typography>

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
                                        <TableCell align="left">Qty</TableCell>
                                        <TableCell align="right">Unit price</TableCell>
                                        <TableCell align="right">Total</TableCell>
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
                                                <Typography variant="subtitle2">Seats Reserved </Typography>

                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">{data?.seats}</TableCell>
                                        <TableCell align="right">{data?.amount / data?.seats} RS</TableCell>
                                        <TableCell align="right">{data?.amount} RS</TableCell>
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
                                        <TableCell align="left">Tour Aprroval Status</TableCell>

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
                                                {data?.isApproved ? <Typography variant="subtitle2">Your did not approve the request yet </Typography> : <Typography variant="subtitle2">You Approved the tour </Typography>}
                                            </Box>
                                        </TableCell>
                                    </TableRow>


                                </TableBody>


                                {data?.isRefunded ? (<><TableHead
                                    sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': { backgroundColor: 'transparent' },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell width={40}>#</TableCell>
                                        <TableCell align="left">Tour Canceled</TableCell>

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
                                                    <Typography variant="subtitle2">You Accepted Refund Request of {data?.touristID?.fname} {data?.touristID?.lname} </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>



                                    </TableBody></>) : (<></>)}


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
