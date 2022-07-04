// @mui
import { Grid, Container, Typography, Card, CardHeader, Stack, Alert } from '@mui/material';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// hooks
import { LoadingButton } from '@mui/lab';
import useSettings from '../../hooks/useSettings';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';

import useIsMountedRef from '../../hooks/useIsMountedRef';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';

import { BookingDetails } from '../../sections/@dashboard/general/booking';

import UserList from './UserList';

import { EcommerceCurrentBalance, EcommerceWelcome } from '../../sections/@dashboard/general/e-commerce';
import PendingApprovalTable from './PendingApprovalTable';
// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();

  const [totaluser, setTotalUser] = useState(null);
  const [activeuser, setActiveUser] = useState(null);
  const [pendingreq, setPendingReq] = useState(null);
  const [deleteduser, setdeleted] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [totalCredits, setTotalCredits] = useState(null);
  const [totalNoOfTours, setTotalNoOfTours] = useState(null);
  const [totalOngoingTours, setTotalOngoingTours] = useState(null);

  const Schema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });
  const fetchDashboard = () => {
    axios
      .get(process.env.REACT_APP_GetADMINDASHBOARD, {
        headers: { 'x-auth-token': localStorage.getItem('accessToken') },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.data.allUsers, res.data.data.totalNoOfUsers);
        setAllUsers([...res.data.data.allUsers]);

        console.log(allUsers);
        setTotalUser(res.data.data.totalNoOfUsers);
        setPendingReq(res.data.data.pendingVendorRequests);
        // console.log(totaluser);
        setActiveUser(res.data.data.totalNoOfActiveUsers);
        setTotalCredits(res.data.data.totalCredits);
        setTotalNoOfTours(res.data.data.totalNoOfTours);
        setTotalOngoingTours(res.data.data.totalOngoingTours);
      });
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('email sent', data.email);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <Page title="Admin: Dashboard">
      <Container maxWidth={themeStretch ? false : 'x1'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <EcommerceWelcome />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardHeader title="Add An Admin " sx={{ mb: 1 }} />
              <Typography sx={{ color: 'text.secondary', ml: 3 }}>Enter Email to Add Admin</Typography>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ mb: 4, mt: 2, px: 5 }}>
                  {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                  <RHFTextField name="email" label="Email address" />
                </Stack>
                <Stack spacing={3} sx={{ my: 4, px: 5 }}>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Add Admin
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </Card>
          </Grid>
        </Grid>

        {/* <Typography variant="h4" sx={{ mb: 2, mt: 5 }} md={{ mb: 2, mt: 5 }}>
          Pending Request
        </Typography> */}

        <Grid container spacing={3} style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Total Credits" total={totalCredits} icon={'entypo:credit'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="All Users" total={totaluser} color="info" icon={'uil:user'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Total Tours Created"
              total={totalNoOfTours}
              color="warning"
              icon={'eva:info-outline'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Total Ongoing Tours"
              total={totalOngoingTours}
              color="info"
              icon={'ant-design:dashboard-twotone'}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* {pendingreq?.map((req) => {
            return (
              <Grid item xs={12} sp={6} md={3}>
                <EcommerceCurrentBalance
                  name={`${req.fname}  ${req.lname}`}
                  id={req._id}
                  email={req.email}
                  image={req.profilePicture}
                  phoneNumber={req.phoneNumber}
                />
              </Grid>
            );
          })} */}
          {pendingreq ? (
            <Grid item xs={12}>
              <PendingApprovalTable user={pendingreq} fetch={fetchDashboard} />
            </Grid>
          ) : (
            <></>
          )}

          {allUsers ? (
            <Grid item xs={12}>
              <BookingDetails user={allUsers?.filter((user) => user?.userType !== 'admin')} fetch={fetchDashboard} />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
