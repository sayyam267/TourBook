import PropTypes from 'prop-types';
import { useEffect,useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// @mui
import { alpha,styled } from '@mui/material/styles';
import { Box, Grid,Divider, Tab, Stepper, Container, StepLabel, StepConnector,Card,Typography ,Button,Stack} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCart, createBilling } from '../../redux/slices/product';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import Markdown from '../../components/Markdown';

import axios from '../../utils/axios';
import { SentIcon } from '../../assets';
// sections
import {
  CheckoutCart,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress,
} from '../../sections/@dashboard/e-commerce/checkout';
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/e-commerce/product-details';

import BookTourMap from '../../components/map/BookTourMap';


// ----------------------------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));


const PRODUCT_DESCRIPTION = [
  {
    title: 'Accmodation',
    description: 'Hotel Stay available.',
    icon: 'icon-park-solid:hotel',
  },
  {
    title: 'TourGuide',
    description: 'Tour Guide Include in this package.',
    icon: 'icon-park-twotone:guide-board',
  },
  {
    title: 'Transport Available',
    description: 'Transport Service Available',
    icon: 'fluent:vehicle-bus-20-filled',
  },
  {
    title: 'Meal Available',
    description: 'Meal Service Available',
    icon: 'dashicons:food',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));



const images = ["https://images.unsplash.com/photo-1647891938250-954addeb9c51?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687","https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176"]

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));



const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify icon={'eva:checkmark-fill'} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}

export default function EcommerceCheckout() {
  const { themeStretch } = useSettings();
  


  const [tour,setTour] = useState([null]);
  const [value, setValue] = useState('1');
  const [booked,setBooked] =useState(false);

  const handleBook = () => {
    setBooked(true);
    console.log(booked);
  }

  useEffect(() => {
    axios.get(`http://tourbook-backend.herokuapp.com/tour/get/${localStorage.getItem('tourId')}`).then(res => {console.log(res);
      console.log(res.data.data.tours); setTour(res.data.data.tours);
})
      
  }, []);

  return (
    <>
    {!booked?
    <Page title="Tour:Detail ">
         
    <Container xs={{mt:20}} maxWidth={themeStretch ? false : 'lg'}>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              Tour Details
            </Typography>
              <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel images={tour.tourpics} />
                </Grid>
                {tour ?<Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary
                    tour={tour}
                    booked={handleBook}
                  />
                </Grid>:<></>}
              </Grid>
            </Card>

            <Stack direction="row" spacing={2}>
            <Grid md={8} sm={12}>
            <Card container sx={{ p: 3, my: 3 }}>
              <LabelStyle>Places of Attraction</LabelStyle>
              <Stack spacing={3}>
                <BookTourMap Width="47vw" Height="50vh"  />
              </Stack>
            </Card>
              </Grid>
              <Grid md={4} sm={8}>
            <Card container sx={{ p: 3, my: 3 }}>
              <LabelStyle>Meet Location</LabelStyle>
              <Stack spacing={3}>
                    <BookTourMap Width="23vw" Height="50vh"  />
              </Stack>
            </Card>
              </Grid>
            </Stack>

          <Typography variant="h4" gutterBottom sx={{mt:4}}>
            What's Included
          </Typography>

            <Grid container sx={{ my: 8 }}>

                {tour.hasGuide?<Grid item xs={12} md={4}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <IconWrapperStyle>
                  <Iconify icon={PRODUCT_DESCRIPTION[1].icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {PRODUCT_DESCRIPTION[1].title}
                    </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{PRODUCT_DESCRIPTION[1].description}</Typography>
                  </Box>
                </Grid>:<></>}


            {tour.hasHotel?<Grid item xs={12} md={4}>
              <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                <IconWrapperStyle>
                  <Iconify icon={PRODUCT_DESCRIPTION[0].icon} width={36} height={36} />
                </IconWrapperStyle>
                <Typography variant="subtitle1" gutterBottom>
                  {PRODUCT_DESCRIPTION[0].title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{PRODUCT_DESCRIPTION[0].description}</Typography>
              </Box>
            </Grid>:<></>}


            {tour.hasFood?<Grid item xs={12} md={4}>
              <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                <IconWrapperStyle>
                  <Iconify icon={PRODUCT_DESCRIPTION[3].icon} width={36} height={36} />
                </IconWrapperStyle>
                <Typography variant="subtitle1" gutterBottom>
                  {PRODUCT_DESCRIPTION[3].title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{PRODUCT_DESCRIPTION[3].description}</Typography>
              </Box>
            </Grid>:<></>}

            {tour.hasTransport ? <Grid item xs={12} md={4}>
              <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                <IconWrapperStyle>
                  <Iconify icon={PRODUCT_DESCRIPTION[2].icon} width={36} height={36} />
                </IconWrapperStyle>
                <Typography variant="subtitle1" gutterBottom>
                  {PRODUCT_DESCRIPTION[2].title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{PRODUCT_DESCRIPTION[2].title}</Typography>
              </Box>
            </Grid> : <></>}
            </Grid>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Description" />
                    <Tab
                      disableRipple
                      value="2"
                      // label={`Review (${product.reviews.length})`}
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={tour.description} />
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>
      {/* <Container maxWidth={themeStretch ? false : 'lg'}>
        <h1>Tour Details</h1>
        <CartWidget />

        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled',
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {!isComplete ? (
          <>
            {activeStep === 0 && <CheckoutCart />}
            {activeStep === 1 && <CheckoutBillingAddress />}
            {activeStep === 2 && billing && <CheckoutPayment />}
          </>
        ) : (
          <CheckoutOrderComplete open={isComplete} />
        )}
      </Container> */}
        </Container>
    </Page>
        : <Page title="Booking Detail" sx={{ height: 1 }}>
          <RootStyle>
          <Container>
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Order Created And Reservation Request sent SuccessFully!
              </Typography>
              <Typography>
                Go Back to &nbsp;
                <strong>Profile</strong>
              </Typography>

              <Button size="large" variant="contained" component={RouterLink} to={PATH_DASHBOARD.user.profile} sx={{ mt: 5 }}>
                Back
              </Button>
            </Box>

        </Container>
            </RootStyle>
        </Page>
}
    </>
  );
}
